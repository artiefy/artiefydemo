// src/app/api/super-admin/whatsapp/inbox/route.ts
import { NextResponse } from 'next/server';

import { desc } from 'drizzle-orm';

import { db } from '~/server/db';
import { waMessages } from '~/server/db/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Definir tipos para la estructura del raw data
interface MediaData {
  id?: string;
  mime_type?: string;
  filename?: string;
}

interface RawMessageData {
  image?: MediaData;
  video?: MediaData;
  audio?: MediaData;
  document?: MediaData & { filename?: string };
}

export async function GET(): Promise<NextResponse> {
  try {
    const rows = await db
      .select({
        id:        waMessages.id,
        metaMessageId: waMessages.metaMessageId,
        waid:      waMessages.waid,
        name:      waMessages.name,
        direction: waMessages.direction,
        msgType:   waMessages.msgType,
        body:      waMessages.body,
        tsMs:      waMessages.tsMs,
        mediaId:   waMessages.mediaId,
        mediaType: waMessages.mediaType,
        fileName:  waMessages.fileName,
        raw:       waMessages.raw,          // 👈 NECESARIO PARA EL FALLBACK
      })
      .from(waMessages)
      .orderBy(desc(waMessages.tsMs))
      .limit(5000);

    const items = rows.map((r) => {
      // Tipado seguro del raw data
      const raw: RawMessageData = (r.raw as RawMessageData) ?? {};

      // Fallbacks desde raw si BD no tiene columnas/valores
      const fbMediaId =
        r.mediaId ??
        raw.image?.id ?? raw.video?.id ?? raw.audio?.id ?? raw.document?.id ?? undefined;

      const fbMediaType =
        r.mediaType ??
        raw.image?.mime_type ?? raw.video?.mime_type ?? raw.audio?.mime_type ?? raw.document?.mime_type ?? undefined;

      const fbFileName =
        r.fileName ?? raw.document?.filename ?? undefined;

      const fbType =
        r.msgType ??
        (raw.image ? 'image' :
         raw.video ? 'video' :
         raw.audio ? 'audio' :
         raw.document ? 'document' : 'text');

      return {
        id: r.metaMessageId ?? String(r.id),
        from: r.direction === 'inbound' ? r.waid : undefined,
        to:   r.direction === 'outbound' ? r.waid : undefined,
        name: r.name ?? undefined,
        timestamp: r.tsMs,
        type: fbType,
        text: r.body ?? undefined,
        direction: r.direction as 'inbound' | 'outbound' | 'status',
        mediaId: fbMediaId,
        mediaType: fbMediaType,
        fileName: fbFileName,
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching inbox:', error);
    return NextResponse.json({ items: [] });
  }
}