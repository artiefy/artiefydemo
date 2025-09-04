// Utilidad para asegurar que los colores sean siempre string
export function safeColor(color: string | undefined, fallback: string): string {
  return typeof color === 'string' && color.length > 0 ? color : fallback;
}
