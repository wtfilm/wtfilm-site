export const metadata = { title: 'Trabalhos · wtfilm' }

// The first 6 items are the "featured" cards shown in the mosaic "todos" view.
// nth-child(1..6) map to the CSS mosaic positions (one per category).
// Items 7+ are hidden in mosaic mode and revealed only when that category is filtered.
type Work = {
  category: string; size: string; kicker: string; title: string; meta: string; glow: string;
  type?: 'video' | 'moodboard'
  vimeoId?: string; vimeoHash?: string
}

const works: Work[] = [
  // ── Mosaic row (6 featured, one per category) ─────────────────────────────
  { category: 'campanhas',  size: 'wide',  kicker: 'Campanha',    title: 'Nova Beleza para Natura',      meta: 'Natura · filme principal',  glow: 'oklch(60% 0.24 18 / .38)' },
  { category: 'ia',         size: 'mid',   kicker: 'Filme + IA',  title: 'Futuro imaginado',             meta: 'wtfilm Lab',                 glow: 'oklch(60% 0.24 18 / .38)' },
  { category: 'conteudo',   size: 'mid',   kicker: 'Conteúdo',    title: 'Conexões que viram histórias', meta: 'documental',                 glow: 'oklch(48% 0.14 245 / .40)', type: 'moodboard' },
  { category: 'videoclipes', size: 'mid',  kicker: 'Videoclipe',  title: 'Melhor Só',                    meta: 'João · performance',         glow: 'oklch(54% 0.17 245 / .38)' },
  { category: 'cinema',     size: 'small', kicker: 'Cinema',      title: 'Entre Silêncios',              meta: 'curta-metragem',             glow: 'oklch(70% 0.18 55 / .36)' },
  { category: 'animacao',   size: 'mid',   kicker: 'Animação',    title: 'Pequenos imaginados',          meta: 'mundo e personagem',         glow: 'oklch(70% 0.18 55 / .34)' },

  // ── Extra campanhas (visible only when filtered) ───────────────────────────
  { category: 'campanhas',  size: 'mid',   kicker: 'Campanha',    title: 'Produto em estado de desejo',  meta: 'beauty · brand film',        glow: 'oklch(60% 0.24 18 / .34)' },
  { category: 'campanhas',  size: 'tall',  kicker: 'Campanha',    title: 'Marca em movimento',           meta: 'automotive · hero cut',      glow: 'oklch(60% 0.24 18 / .32)' },

  // ── Extra IA ───────────────────────────────────────────────────────────────
  { category: 'ia',         size: 'mid',   kicker: 'Filme + IA',  title: 'Memórias sintéticas',          meta: 'concept film',               glow: 'oklch(60% 0.24 18 / .34)' },
  { category: 'ia',         size: 'mid',   kicker: 'Filme + IA',  title: 'Horizontes artificiais',       meta: 'visual research',            glow: 'oklch(60% 0.24 18 / .32)' },

  // ── Extra conteúdo ─────────────────────────────────────────────────────────
  { category: 'conteudo',   size: 'wide',  kicker: 'Conteúdo',    title: 'Rua, corpo, presença',         meta: 'social film',                glow: 'oklch(48% 0.14 245 / .34)' },
  { category: 'conteudo',   size: 'tall',  kicker: 'Conteúdo',    title: 'Diário de marca',              meta: 'branded doc',                glow: 'oklch(48% 0.14 245 / .32)' },

  // ── Extra videoclipes ──────────────────────────────────────────────────────
  { category: 'videoclipes', size: 'wide', kicker: 'Videoclipe',  title: 'Noite elétrica',               meta: 'artist film',                glow: 'oklch(54% 0.17 245 / .34)' },
  { category: 'videoclipes', size: 'mid',  kicker: 'Videoclipe',  title: 'Ritmo suspenso',               meta: 'live session',               glow: 'oklch(54% 0.17 245 / .32)' },

  // ── Extra cinema ───────────────────────────────────────────────────────────
  { category: 'cinema',     size: 'wide',  kicker: 'Cinema',      title: 'Estrada sem retorno',          meta: 'narrativa',                  glow: 'oklch(70% 0.18 55 / .34)' },
  { category: 'cinema',     size: 'mid',   kicker: 'Cinema',      title: 'Depois da luz',                meta: 'frame study',                glow: 'oklch(70% 0.18 55 / .32)' },

  // ── Extra animação ─────────────────────────────────────────────────────────
  { category: 'animacao',   size: 'wide',  kicker: 'Animação',    title: 'Mundo inventado',              meta: 'character film',             glow: 'oklch(70% 0.18 55 / .32)' },
  { category: 'animacao',   size: 'tall',  kicker: 'Animação',    title: 'Textura de sonho',             meta: 'fantasia visual',            glow: 'oklch(70% 0.18 55 / .30)' },
]

export default function TrabalhosPage() {
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
          {works.map((w, i) => (
            <article
              key={i}
              className={`card ${w.size}`}
              role="button"
              tabIndex={0}
              data-category={w.category}
              data-work-type={w.type ?? 'video'}
              data-vimeo-id={w.vimeoId ?? ''}
              data-vimeo-hash={w.vimeoHash ?? ''}
              style={{ '--card-glow': w.glow } as React.CSSProperties}
            >
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
