import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { createNotification } from '~/server/actions/estudiantes/notifications/createNotification';
import { db } from '~/server/db';
import {
  projectParticipationRequests,
  projectsTaken,
  users,
} from '~/server/db/schema';
import { projects } from '~/server/db/schema';

// Crear solicitud de participación
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    interface ParticipationRequestBody {
      projectId: number | string;
      requestMessage?: string;
      requestType?: 'participation' | 'resignation';
    }

    const body: ParticipationRequestBody = await request.json();
    const projectId = Number(body.projectId);
    const requestMessage: string = body.requestMessage ?? '';
    const requestType: 'participation' | 'resignation' =
      body.requestType ?? 'participation';

    if (!projectId) {
      return NextResponse.json(
        { error: 'projectId es requerido' },
        { status: 400 }
      );
    }

    // Validar que el tipo de solicitud sea válido
    if (!['participation', 'resignation'].includes(requestType)) {
      return NextResponse.json(
        { error: 'Tipo de solicitud inválido' },
        { status: 400 }
      );
    }

    // Para solicitudes de renuncia, verificar que el usuario esté inscrito
    if (requestType === 'resignation') {
      const existingEnrollment = await db
        .select()
        .from(projectsTaken)
        .where(
          and(
            eq(projectsTaken.userId, userId),
            eq(projectsTaken.projectId, projectId)
          )
        )
        .limit(1);

      if (!existingEnrollment.length) {
        return NextResponse.json(
          { error: 'No estás inscrito en este proyecto' },
          { status: 400 }
        );
      }
    } else {
      // Para solicitudes de participación, verificar que no esté ya inscrito
      const existingEnrollment = await db
        .select()
        .from(projectsTaken)
        .where(
          and(
            eq(projectsTaken.userId, userId),
            eq(projectsTaken.projectId, projectId)
          )
        )
        .limit(1);

      if (existingEnrollment.length > 0) {
        return NextResponse.json(
          { error: 'Ya estás inscrito en este proyecto' },
          { status: 400 }
        );
      }
    }

    // Verificar si ya existe una solicitud pendiente del mismo tipo
    const existingRequest = await db
      .select()
      .from(projectParticipationRequests)
      .where(
        and(
          eq(projectParticipationRequests.userId, userId),
          eq(projectParticipationRequests.projectId, projectId),
          eq(projectParticipationRequests.requestType, requestType),
          eq(projectParticipationRequests.status, 'pending')
        )
      )
      .limit(1);

    if (existingRequest.length > 0) {
      const messageType =
        requestType === 'participation' ? 'participación' : 'renuncia';
      return NextResponse.json(
        { error: `Ya tienes una solicitud de ${messageType} pendiente` },
        { status: 400 }
      );
    }

    // Crear la nueva solicitud
    const [newRequest] = await db
      .insert(projectParticipationRequests)
      .values({
        userId,
        projectId,
        requestType,
        requestMessage,
        status: 'pending',
      })
      .returning();

    // --- NUEVO: Crear notificación para el responsable del proyecto ---
    // Obtener el responsable del proyecto
    const project = await db
      .select({ userId: projects.userId, name: projects.name })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (project.length && project[0].userId) {
      const responsableId = project[0].userId;
      let notifTitle = '';
      let notifMsg = '';
      if (requestType === 'participation') {
        notifTitle = 'Nueva solicitud de participación';
        notifMsg = `Tienes una nueva solicitud para unirse a tu proyecto "${project[0].name ?? ''}".`;
      } else {
        notifTitle = 'Nueva solicitud de renuncia';
        notifMsg = `Un integrante ha solicitado renunciar al proyecto "${project[0].name ?? ''}".`;
      }
      // Crea la notificación (ignora el resultado)
      await createNotification({
        userId: responsableId,
        type: 'participation-request', // <-- ahora permitido por el type extendido
        title: notifTitle,
        message: notifMsg,
        metadata: {
          projectId,
          requestType,
        },
      });
    }
    // --- FIN NUEVO ---

    return NextResponse.json(newRequest);
  } catch (error) {
    console.error('Error creando solicitud:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Obtener solicitudes de un proyecto
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectIdParam = searchParams.get('projectId');
    const checkUserId = searchParams.get('userId');

    if (!projectIdParam) {
      return NextResponse.json(
        { error: 'projectId es requerido' },
        { status: 400 }
      );
    }
    const projectId = Number(projectIdParam);

    // Si se proporciona userId, verificar solicitud específica
    if (checkUserId) {
      const userRequest = await db
        .select({
          id: projectParticipationRequests.id,
          userId: projectParticipationRequests.userId,
          projectId: projectParticipationRequests.projectId,
          requestType: projectParticipationRequests.requestType,
          status: projectParticipationRequests.status,
          requestMessage: projectParticipationRequests.requestMessage,
          createdAt: projectParticipationRequests.createdAt,
        })
        .from(projectParticipationRequests)
        .where(
          and(
            eq(projectParticipationRequests.userId, checkUserId),
            eq(projectParticipationRequests.projectId, projectId),
            eq(projectParticipationRequests.status, 'pending')
          )
        )
        .limit(1);

      if (userRequest.length === 0) {
        return NextResponse.json(null, { status: 404 });
      }

      return NextResponse.json(userRequest[0]);
    }

    // Obtener todas las solicitudes del proyecto con información del usuario
    const requests = await db
      .select({
        id: projectParticipationRequests.id,
        userId: projectParticipationRequests.userId,
        projectId: projectParticipationRequests.projectId,
        requestType: projectParticipationRequests.requestType,
        status: projectParticipationRequests.status,
        requestMessage: projectParticipationRequests.requestMessage,
        responseMessage: projectParticipationRequests.responseMessage,
        createdAt: projectParticipationRequests.createdAt,
        updatedAt: projectParticipationRequests.updatedAt,
        respondedAt: projectParticipationRequests.respondedAt,
        respondedBy: projectParticipationRequests.respondedBy,
        userName: users.name,
        userEmail: users.email,
      })
      .from(projectParticipationRequests)
      .innerJoin(users, eq(projectParticipationRequests.userId, users.id))
      .where(eq(projectParticipationRequests.projectId, projectId))
      .orderBy(projectParticipationRequests.createdAt);

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error obteniendo solicitudes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Eliminar todas las solicitudes de un proyecto
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectIdParam = searchParams.get('projectId');

    if (!projectIdParam) {
      return NextResponse.json(
        { error: 'projectId es requerido' },
        { status: 400 }
      );
    }
    const projectId = Number(projectIdParam);

    // Eliminar todas las solicitudes del proyecto
    const deletedRequests = await db
      .delete(projectParticipationRequests)
      .where(eq(projectParticipationRequests.projectId, projectId))
      .returning();

    return NextResponse.json({
      message: `${deletedRequests.length} solicitudes eliminadas exitosamente`,
      deletedCount: deletedRequests.length,
      deletedRequests,
    });
  } catch (error) {
    console.error('Error eliminando solicitudes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
