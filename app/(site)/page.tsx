import Link from 'next/link'
import { client } from '../../sanity/lib/client'
import { homePageQuery } from '../../sanity/lib/queries'

export const revalidate = 60

// ── Mapeamento de categoria → className e número ──────────────────────────
const categoryMap: Record<string, { className: string; number: string }> = {
  campanhas:   { className: 'campaign',  number: '01' },
  ia:          { className: 'lab',       number: '02' },
  conteudo:    { className: 'content',   number: '03' },
  videoclipes: { className: 'music',     number: '04' },
  cinema:      { className: 'cinema',    number: '05' },
  animacao:    { className: 'animation', number: '06' },
}

// ── Fallback caso Sanity esteja vazio ─────────────────────────────────────
const fallbackHero = {
  heroKicker:   'Produzimos filmes que conectam.',
  heroTitulo:   'Histórias\nque não\npassam',
  heroCtaLabel: 'Assista ao reel',
  heroVimeoId:  '699221144',
  heroVimeoHash: '41566b7914',
}

const fallbackLaminas = [
  { categoria: 'campanhas',   titulo: 'Campanhas',       texto: 'Imagem de marca com desejo, presença e precisão.', vimeoId: '804424468',  vimeoHash: '',          vimeoStart: 0 },
  { categoria: 'ia',          titulo: 'IA / Experimentos', texto: 'Novas linguagens sem perder direção.',            vimeoId: '1192826549', vimeoHash: 'a4dd577f3a', vimeoStart: 0 },
  { categoria: 'conteudo',    titulo: 'Conteúdo',         texto: 'Presença humana, ritmo social e intenção visual.', vimeoId: '806033496',  vimeoHash: '',          vimeoStart: 0 },
  { categoria: 'videoclipes', titulo: 'Videoclipes',      texto: 'Cor, corpo e movimento como narrativa.',           vimeoId: '302965213',  vimeoHash: '',          vimeoStart: 0 },
  { categoria: 'cinema',      titulo: 'Cinema',           texto: 'Atmosfera, silêncio e personagem.',                vimeoId: '831215945',  vimeoHash: '',          vimeoStart: 88 },
  { categoria: 'animacao',    titulo: 'Animação',         texto: 'Mundos imaginados com textura de filme.',           vimeoId: '804416179',  vimeoHash: '',          vimeoStart: 11 },
]

function vimeoSrc(id: string, hash: string, startSec: number) {
  const h = hash ? `&h=${hash}` : ''
  const t = startSec > 0 ? `#t=${startSec}` : ''
  return `https://player.vimeo.com/video/${id}?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1${h}${t}`
}

export default async function HomePage() {
  const sanity = await client.fetch(homePageQuery).catch(() => null)

  const hero = {
    kicker:   sanity?.heroKicker   ?? fallbackHero.heroKicker,
    titulo:   sanity?.heroTitulo   ?? fallbackHero.heroTitulo,
    ctaLabel: sanity?.heroCtaLabel ?? fallbackHero.heroCtaLabel,
    vimeoId:  sanity?.heroVimeoId  ?? fallbackHero.heroVimeoId,
    vimeoHash: sanity?.heroVimeoHash ?? fallbackHero.heroVimeoHash,
  }

  const laminas = (sanity?.laminas?.length ? sanity.laminas : fallbackLaminas).map(
    (l: typeof fallbackLaminas[0], i: number) => ({
      ...l,
      slug:      l.categoria,
      step:      i,
      className: categoryMap[l.categoria]?.className ?? l.categoria,
      number:    categoryMap[l.categoria]?.number    ?? String(i + 1).padStart(2, '0'),
    })
  )

  const heroSrc = `https://player.vimeo.com/video/${hero.vimeoId}?h=${hero.vimeoHash}&badge=0&autopause=0&player_id=hero-reel&app_id=58479&autoplay=1&muted=1&loop=1&background=1`

  return (
    <main className="site home-site">
      <section className="home-experience" id="inicio" data-home-experience>

        {/* ① Backdrop — hero video fixo, puramente visual, sem interação */}
        <div className="hero hero-backdrop" aria-hidden="true">
          <div className="hero-video">
            <iframe
              src={heroSrc}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="wtfilm reel"
            />
          </div>
          <div className="glass-rail glass-rail-a" data-depth="1.2" />
          <div className="glass-rail glass-rail-b" data-depth="-0.8" />
          <div className="cursor-light" />
        </div>

        {/* ② Scroll-snap container — spacer transparente + lâminas */}
        <div className="chapter-scroller" data-chapter-scroller>

          {/* Slide 0 — spacer transparente (hero aparece por baixo) */}
          <div className="chapter-slide hero-spacer" aria-hidden="true" />

          {/* Slides — Chapters vindos do Sanity */}
          {laminas.map((ch) => (
            <article
              key={ch.slug}
              className={`chapter-slide chapter ${ch.className}`}
              data-step={ch.step}
            >
              <div className="chapter-visual">
                <div className="chapter-visual-video" aria-hidden="true">
                  <iframe
                    data-src={vimeoSrc(ch.vimeoId, ch.vimeoHash, ch.vimeoStart ?? 0)}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    title={ch.titulo}
                  />
                </div>
                <div className="ch-glass ch-glass-a" aria-hidden="true" />
                <div className="ch-glass ch-glass-b" aria-hidden="true" />
              </div>
              <div className="chapter-info">
                <span className="chapter-number">{ch.number}</span>
                <h2>
                  <Link className="chapter-title-link" href={`/trabalhos?f=${ch.slug}`}>
                    {ch.titulo}
                  </Link>
                </h2>
                <Link
                  className="chapter-arrow-link"
                  href={`/trabalhos?f=${ch.slug}`}
                  aria-label={`Ver ${ch.titulo.toLowerCase()}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <p>{ch.texto}</p>
              </div>
            </article>
          ))}

        </div>

        {/* ③ Overlay de conteúdo do hero — some quando entra num capítulo */}
        <div className="hero-content-overlay" aria-hidden="false">
          <div className="hero-content" data-parallax=".42">
            <div className="kicker">{hero.kicker}</div>
            <h1 className="mega-title">
              {hero.titulo.split('\n').map((linha, i, arr) => (
                <span key={i}>{linha}{i < arr.length - 1 && <br />}</span>
              ))}<span className="dot">.</span>
            </h1>
            <a className="play-link" href="#reel" data-reel-player>
              <span aria-hidden="true" />
              <strong>{hero.ctaLabel}</strong>
            </a>
          </div>
        </div>

        {/* ④ Controles — sempre overlay */}
        <button
          className="scroll-cue"
          type="button"
          data-scroll-reveal
          aria-label="Ver categorias"
        >
          <span className="scroll-cue-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </span>
          <span className="scroll-cue-text">explorar</span>
        </button>

        <div className="sequence-progress" aria-hidden="true"><span /></div>

        <button
          className="chapter-return"
          type="button"
          data-chapter-return
          aria-label="Voltar ao início"
        >
          <span className="chapter-return-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </span>
          <span className="chapter-return-text">início</span>
        </button>

      </section>
    </main>
  )
}
