import { eq } from 'drizzle-orm';

import { db } from '~/server/db/index';
import {
  activities,
  courses,
  lessons,
  typeActi,
  userActivitiesProgress,
} from '~/server/db/schema';

// Interfaces
export interface Activity {
  id: number;
  name: string;
  description: string | null;
  lastUpdated: Date;
  lessonsId: number;
  porcentaje: number | null;
  parametroId: number | null; // <-- Ajusta esto
  fechaMaximaEntrega: Date | null;
  typeid: number;
  revisada: boolean;
  isCompleted: boolean;
  userProgress: number;
}

// Actualizar la interfaz ActivityDetails
export interface ActivityDetails {
  id: number;
  name: string;
  description: string | null;
  type: {
    id: number;
    name: string;
    description: string;
  };
  revisada: boolean;
  pesoNota: number | null;
  parametroId: number | null;
  lessonsId: {
    id: number;
    title: string;
    coverImageKey: string;
    courseId: {
      id: number | null;
      title: string | null;
      description: string | null;
      instructor: string | null;
    };
  };
  fechaMaximaEntrega: Date | null;
}

interface CreateActivityParams {
  name: string;
  description: string;
  typeid: number;
  lessonsId: number;
  revisada: boolean;
  parametroId?: number | null;
  porcentaje: number;
  fechaMaximaEntrega: Date | null;
}

// CRUD Operations
// Crear una nueva actividad
export async function createActivity(params: CreateActivityParams) {
  try {
    const newActivity = await db
      .insert(activities)
      .values({
        name: params.name,
        description: params.description,
        typeid: params.typeid,
        lessonsId: params.lessonsId,
        revisada: params.revisada,
        parametroId: params.parametroId ?? null,
        porcentaje: params.porcentaje ?? 0,
        lastUpdated: new Date(),
        fechaMaximaEntrega: params.fechaMaximaEntrega ?? null,
      })
      .returning();

    if (!newActivity[0]) {
      throw new Error('No se pudo crear la actividad');
    }

    return newActivity[0];
  } catch (error) {
    console.error('Error detallado:', error);
    throw new Error(
      `Error al crear la actividad: ${error instanceof Error ? error.message : 'Error desconocido'}`
    );
  }
}

// Obtener una actividad por ID
export const getActivityById = async (activityId: number) => {
  try {
    const result = await db
      .select({
        id: activities.id,
        name: activities.name,
        description: activities.description,
        type: {
          id: typeActi.id,
          name: typeActi.name,
          description: typeActi.description,
        },
        revisada: activities.revisada,
        pesoNota: activities.porcentaje,
        parametroId: activities.parametroId,
        lesson: {
          id: lessons.id,
          title: lessons.title,
          coverImageKey: lessons.coverImageKey,
          courseId: courses.id,
          courseTitle: courses.title,
          courseDescription: courses.description,
          courseInstructor: courses.instructor,
        },
        fechaMaximaEntrega: activities.fechaMaximaEntrega,
      })
      .from(activities)
      .leftJoin(typeActi, eq(activities.typeid, typeActi.id))
      .leftJoin(lessons, eq(activities.lessonsId, lessons.id))
      .leftJoin(courses, eq(lessons.courseId, courses.id))
      .where(eq(activities.id, activityId))
      .limit(1);

    const activity = result[0] as unknown as ActivityDetails;

    if (!activity) {
      return null;
    }

    return activity;
  } catch (error) {
    throw new Error(
      `Error al obtener la actividad: ${error instanceof Error ? error.message : 'Error desconocido'}`
    );
  }
};

// Obtener todas las actividades de una lección
export const getActivitiesByLessonId = async (
  lessonId: number
): Promise<ActivityDetails[]> => {
  try {
    const actividades = await db
      .select({
        id: activities.id,
        name: activities.name,
        description: activities.description,
        type: {
          id: typeActi.id,
          name: typeActi.name,
          description: typeActi.description,
        },
        revisada: activities.revisada,
        porcentaje: activities.porcentaje,
        parametroId: activities.parametroId,
        lesson: {
          id: lessons.id,
          title: lessons.title,
          coverImageKey: lessons.coverImageKey,
          courseId: courses.id,
          courseTitle: courses.title,
          courseDescription: courses.description,
          courseInstructor: courses.instructor,
        },
        fechaMaximaEntrega: activities.fechaMaximaEntrega,
      })
      .from(activities)
      .leftJoin(typeActi, eq(activities.typeid, typeActi.id))
      .leftJoin(lessons, eq(activities.lessonsId, lessons.id))
      .leftJoin(courses, eq(lessons.courseId, courses.id))
      .where(eq(activities.lessonsId, lessonId));

    return actividades.map((actividad) => ({
      id: actividad.id,
      name: actividad.name,
      description: actividad.description,
      type: {
        id: actividad.type?.id ?? 0,
        name: actividad.type?.name ?? '',
        description: actividad.type?.description ?? '',
      },
      revisada: actividad.revisada ?? false,
      pesoNota: actividad.porcentaje ?? 0, // Added pesoNota
      parametroId: actividad.parametroId ?? 0,
      lessonsId: {
        id: actividad.lesson.id ?? 0,
        title: actividad.lesson.title ?? '',
        coverImageKey: actividad.lesson.coverImageKey ?? '',
        courseId: {
          id: actividad.lesson.courseId,
          title: actividad.lesson.courseTitle,
          description: actividad.lesson.courseDescription,
          instructor: actividad.lesson.courseInstructor,
        },
      },
      fechaMaximaEntrega: actividad.fechaMaximaEntrega ?? null,
    }));
  } catch (error) {
    console.error('Error fetching activities by lesson ID:', error);
    throw error;
  }
};

// Actualizar una actividad
export const updateActivity = async (
  activityId: number,
  { name, description, typeid }: Partial<Omit<Activity, 'id' | 'lessonsId'>>
): Promise<void> => {
  try {
    const updateData: Partial<Omit<Activity, 'id' | 'lessonsId'>> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (typeid !== undefined) updateData.typeid = typeid;

    await db
      .update(activities)
      .set(updateData)
      .where(eq(activities.id, activityId));
  } catch (error) {
    throw new Error(
      `Error al actualizar la actividad: ${error instanceof Error ? error.message : 'Error desconocido'}`
    );
  }
};

// Eliminar una actividad y todos los datos asociados
export const deleteActivity = async (activityId: number): Promise<void> => {
  try {
    // Eliminar los datos asociados en userActivitiesProgress
    await db
      .delete(userActivitiesProgress)
      .where(eq(userActivitiesProgress.activityId, activityId));

    // Eliminar la actividad
    await db.delete(activities).where(eq(activities.id, activityId));
  } catch (error) {
    throw new Error(
      `Error al eliminar la actividad: ${error instanceof Error ? error.message : 'Error desconocido'}`
    );
  }
};

//Delete all activities by lesson id
export const deleteActivitiesByLessonId = async (lessonId: number) => {
  // Elimina las actividades asociadas a la lección
  await db.delete(activities).where(eq(activities.lessonsId, lessonId));
};

// Modificar la función getTotalPorcentajeByParametro para incluir más detalles
export async function getTotalPorcentajeByParametro(
  parametroId: number
): Promise<{
  total: number;
  actividades: { id: number; name: string; porcentaje: number }[];
}> {
  try {
    const actividades = await db
      .select({
        id: activities.id,
        name: activities.name,
        porcentaje: activities.porcentaje,
      })
      .from(activities)
      .where(eq(activities.parametroId, parametroId));

    const total = actividades.reduce(
      (sum, act) => sum + (act.porcentaje ?? 0),
      0
    );

    return {
      total,
      actividades: actividades.map((act) => ({
        ...act,
        porcentaje: act.porcentaje ?? 0,
      })),
    };
  } catch (error) {
    console.error('Error al obtener el total de porcentajes:', error);
    throw new Error('Error al calcular el total de porcentajes');
  }
}
