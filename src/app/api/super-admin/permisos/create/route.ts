import { NextResponse } from 'next/server';

import { db } from '~/server/db';
import { permisos } from '~/server/db/schema';

const ACCIONES = [
  'create',
  'read',
  'update',
  'delete',
  'approve',
  'assign',
  'publish',
] as const;

type Accion = (typeof ACCIONES)[number];

interface PermisoBody {
  name: string;
  description?: string;
  servicio: string;
  accion: Accion;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PermisoBody;
    const { name, description } = body;

    if (!name.trim() || !body.servicio || !body.accion) {
      return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });
    }

    if (
      !name.trim() ||
      !body.servicio.trim() ||
      !ACCIONES.includes(body.accion)
    ) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const created = await db
      .insert(permisos)
      .values({
        name,
        description,
        servicio: body.servicio,
        accion: body.accion,
      })
      .returning();

    // Tipar el resultado si es necesario:
    const permisoCreado = created[0] as { name: string; description?: string };

    return NextResponse.json(permisoCreado);
  } catch (error) {
    console.error('Error al crear permiso:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
