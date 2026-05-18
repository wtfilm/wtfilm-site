import { client } from '../../../sanity/lib/client'
import { allProjectsQuery } from '../../../sanity/lib/queries'
import { getVimeoThumb } from '../../lib/vimeo'

export const metadata = { title: 'Trabalhos · wtfilm' }
export const revalidate = 60

// ── Tipos ────────────────────────────────────────────────────────────────

type SanityProject = {
  _id: string
  titulo: string
  slug?: { current: string }
  kicker?: string
  meta?: string
  categoria: string
  cardSize?: string
  cardGlow?: string
  isMoodboard?: boolean
  vimeoId?: string
  vimeoHash?: string
  thumbnail?: { asset: { url: string } }
}

type CardData = {
  id: string
  slug?: string
  category: string
  size: string
  kicker: string
  title: string
  meta: string
  glow: string
  isMoodboard: boolean
  vimeoId?: string
  vimeoHash?: string
  thumbUrl?: string
}

// ── Fallback (placeholders enquanto Sanity estiver vazio) ────────────────

const fallbackWorks: CardData[] = [
  { id: 'f1',  category: 'campanhas',   size: 'wide',  kicker: 'Campanha',   title: 'Nova Beleza para Natura',      meta: 'Natura · filme principal',  glow: 'oklch(60% 0.24 18 / .38)',  isMoodboard: false },
  { id: 'f2',  category: 'campanhas',   size: 'mid',   kicker: 'Campanha',   title: 'Produto em estado de desejo',  meta: 'beauty · brand film',       glow: 'oklch(60% 0.24 18 / .34)',  isMoodboard: false },
  { id: 'f3',  category: 'campanhas',   size: 'tall',  kicker: 'Campanha',   title: 'Marca em movimento',           meta: 'automotive · hero cut',     glow: 'oklch(60% 0.24 18 / .32)',  isMoodboard: false },
  { id: 'f4',  category: 'ia',          size: 'wide',  kicker: 'Filme + IA', title: 'Futuro imaginado',             meta: 'wtfilm Lab',                glow: 'oklch(60% 0.24 18 / .38)',  isMoodboard: false },
  { id: 'f5',  category: 'ia',          size: 'mid',   kicker: 'Filme + IA', title: 'Memórias sintéticas',          meta: 'concept film',              glow: 'oklch(60% 0.24 18 / .34)',  isMoodboard: false },
  { id: 'f6',  category: 'ia',          size: 'mid',   kicker: 'Filme + IA', title: 'Horizontes artificiais',       meta: 'visual research',           glow: 'oklch(60% 0.24 18 / .32)',  isMoodboard: false },
  { id: 'f7',  category: 'conteudo',    size: 'mid',   kicker: 'Conteúdo',   title: 'Conexões que viram histórias', meta: 'documental',                glow: 'oklch(48% 0.14 245 / .40)', isMoodboard: true  },
  { id: 'f8',  category: 'conteudo',    size: 'wide',  kicker: 'Conteúdo',   title: 'Rua, corpo, presença',         meta: 'social film',               glow: 'oklch(48% 0.14 245 / .34)', isMoodboard: false },
  { id: 'f9',  category: 'conteudo',    size: 'tall',  kicker: 'Conteúdo',   title: 'Diário de marca',              meta: 'branded doc',               glow: 'oklch(48% 0.14 245 / .32)', isMoodboard: false },
  { id: 'f10', category: 'videoclipes', size: 'mid',   kicker: 'Videoclipe', title: 'Melhor Só',                    meta: 'João · performance',        glow: 'oklch(54% 0.17 245 / .38)', isMoodboard: false },
  { id: 'f11', category: 'videoclipes', size: 'wide',  kicker: 'Videoclipe', title: 'Noite elétrica',               meta: 'artist film',               glow: 'oklch(54% 0.17 245 / .34)', isMoodboard: false },
  { id: 'f12', category: 'videoclipes', size: 'mid',   kicker: 'Videoclipe', title: 'Ritmo suspenso',               meta: 'live session',              glow: 'oklch(54% 0.17 245 / .32)', isMoodboard: false },
  { id: 'f13', category: 'cinema',      size: 'small', kicker: 'Cinema',     title: 'Entre Silêncios',              meta: 'curta-metragem',            glow: 'oklch(70% 0.18 55 / .36)',  isMoodboard: false },
  { id: 'f14', category: 'cinema',      size: 'wide',  kicker: 'Cinema',     title: 'Estrada sem retorno',          meta: 'narrativa',                 glow: 'oklch(70% 0.18 55 / .34)',  isMoodboard: false },
  { id: 'f15', category: 'cinema',      size: 'mid',   kicker: 'Cinema',     title: 'Depois da luz',                meta: 'frame study',               glow: 'oklch(70% 0.18 55 / .32)',  isMoodboard: false },
  { id: 'f16', category: 'animacao',    size: 'mid',   kicker: 'Animação',   title: 'Pequenos imaginados',          meta: 'mundo e personagem',        glow: 'oklch(70% 0.18 55 / .34)',  isMoodboard: false },
  { id: 'f17', category: 'animacao',    size: 'wide',  kicker: 'Animação',   title: 'Mundo inventado',              meta: 'character film',            glow: 'oklch(70% 0.18 55 / .32)',  isMoodboard: false },
  { id: 'f18', category: 'animacao',    size: 'tall',  kicker: 'Animação',   title: 'Textura de sonho',             meta: 'fantasia visual',           glow: 'oklch(70% 0.18 55 / .30)',  isMoodboard: false },
]

// ── Page ─────────────────────────────────────────────────────────────────

export default async function TrabalhosPage() {
  // 1. Busca projetos no Sanity
  const sanityProjects: SanityProject[] = await client.fetch(allProjectsQuery).catch(() => [])

  // 2. Se Sanity vazio, usa fallback estático
  let works: CardData[]
  if (sanityProjects.length === 0) {
    works = fallbackWorks
  } else {
    // 3. Para projetos sem thumbnail, busca do Vimeo em paralelo
    works = await Promise.all(
      sanityProjects.map(async (p): Promise<CardData> => {
        const customThumb = p.thumbnail?.asset?.url
        let thumbUrl: string | undefined = customThumb

        if (!customThumb && p.vimeoId) {
          const vimeoThumb = await getVimeoThumb(p.vimeoId, p.vimeoHash)
          thumbUrl = vimeoThumb ?? undefined
        }

        return {
          id: p._id,
          slug: p.slug?.current,
          category: p.categoria,
          size: p.cardSize ?? 'mid',
          kicker: p.kicker ?? '',
          title: p.titulo,
          meta: p.meta ?? '',
          glow: p.cardGlow ?? 'oklch(60% 0.24 18 / .35)',
          isMoodboard: p.isMoodboard ?? false,
          vimeoId: p.vimeoId,
          vimeoHash: p.vimeoHash,
          thumbUrl,
        }
      })
    )
  }

  return (
    <main className="site">
      <section className="page works-page">
        <span className="kicker">Biblioteca visual</span>
        <h1 className="page-title">Todos os trabalhos</h1>

        <div className="toolbar">
          <div className="filters" data-filter-group>
            <button className="pill active" data-filter="todos">Todos</button>
            <button className="pill" data-filter="campanhas">Campanhas</button>
            <button className="pill" data-filter="ia">IA / Experimentos</button>
            <button className="pill" data-filter="conteudo">Conteúdo</button>
            <button className="pill" data-filter="videoclipes">Videoclipes</button>
            <button className="pill" data-filter="cinema">Cinema</button>
            <button className="pill" data-filter="animacao">Animação</button>
          </div>
        </div>

        <div className="grid works-rail" aria-label="Lista de trabalhos">
          {works.map((w) => (
            <article
              key={w.id}
              className={`card ${w.size}`}
              role="button"
              tabIndex={0}
              data-category={w.category}
              data-work-type={w.isMoodboard ? 'moodboard' : 'video'}
              data-vimeo-id={w.vimeoId ?? ''}
              data-vimeo-hash={w.vimeoHash ?? ''}
              style={{ '--card-glow': w.glow } as React.CSSProperties}
            >
              {w.thumbUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="card-thumb" src={w.thumbUrl} alt={w.title} />
              )}
              <div className="card-content">
                <span className="kicker">{w.kicker}</span>
                <h3>{w.title}</h3>
                <div className="card-meta">{w.meta}</div>
                <span className="arrow">→</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
