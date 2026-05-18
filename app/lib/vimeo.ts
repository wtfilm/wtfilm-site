/**
 * Retorna a URL da thumbnail de um vídeo do Vimeo via oEmbed.
 * Resultado fica em cache por 24h no Next.js (revalidate).
 */
export async function getVimeoThumb(vimeoId: string, vimeoHash?: string): Promise<string | null> {
  if (!vimeoId) return null
  try {
    const videoUrl = vimeoHash
      ? `https://vimeo.com/${vimeoId}/${vimeoHash}`
      : `https://vimeo.com/${vimeoId}`
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}&width=800`,
      { next: { revalidate: 86400 } } // cache 24h
    )
    if (!res.ok) return null
    const data = await res.json()
    return (data.thumbnail_url as string) ?? null
  } catch {
    return null
  }
}
