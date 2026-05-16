import Link from 'next/link'

const chapters = [
  {
    slug: 'campanhas',
    step: 0,
    className: 'campaign',
    number: '01',
    title: 'Campanhas',
    desc: 'Imagem de marca com desejo, presença e precisão.',
    vimeoId: '804424468',
    vimeoHash: '',
    vimeoStart: 0,
  },
  {
    slug: 'ia',
    step: 1,
    className: 'lab',
    number: '02',
    title: 'IA / Experimentos',
    desc: 'Novas linguagens sem perder direção.',
    vimeoId: '1192826549',
    vimeoHash: 'a4dd577f3a',
    vimeoStart: 0,
  },
  {
    slug: 'conteudo',
    step: 2,
    className: 'content',
    number: '03',
    title: 'Conteúdo',
    desc: 'Presença humana, ritmo social e intenção visual.',
    vimeoId: '806033496',
    vimeoHash: '',
    vimeoStart: 0,
  },
  {
    slug: 'videoclipes',
    step: 3,
    className: 'music',
    number: '04',
    title: 'Videoclipes',
    desc: 'Cor, corpo e movimento como narrativa.',
    vimeoId: '302965213',
    vimeoHash: '',
    vimeoStart: 0,
  },
  {
    slug: 'cinema',
    step: 4,
    className: 'cinema',
    number: '05',
    title: 'Cinema',
    desc: 'Atmosfera, silêncio e personagem.',
    vimeoId: '831215945',
    vimeoHash: '',
    vimeoStart: 88, // 1 min 28 seg
  },
  {
    slug: 'animacao',
    step: 5,
    className: 'animation',
    number: '06',
    title: 'Animação',
    desc: 'Mundos imaginados com textura de filme.',
    vimeoId: '804416179',
    vimeoHash: '',
    vimeoStart: 11,
  },
]

function vimeoSrc(id: string, hash: string, startSec: number) {
  const h = hash ? `&h=${hash}` : ''
  const t = startSec > 0 ? `#t=${startSec}` : ''
  return `https://player.vimeo.com/video/${id}?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1${h}${t}`
}

export default function HomePage() {
  return (
    <main className="site home-site">
      <section className="home-experience" id="inicio" data-home-experience>

        {/* ① Backdrop — hero video fixo, puramente visual, sem interação */}
        <div className="hero hero-backdrop" aria-hidden="true">
          <div className="hero-video">
            <iframe
              src="https://player.vimeo.com/video/699221144?h=41566b7914&badge=0&autopause=0&player_id=hero-reel&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
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

        {/* ② Scroll-snap container — spacer transparente + 6 lâminas */}
        <div className="chapter-scroller" data-chapter-scroller>

          {/* Slide 0 — spacer transparente (hero aparece por baixo) */}
          <div className="chapter-slide hero-spacer" aria-hidden="true" />

          {/* Slides 1–6 — wrapper recebe snap-align; article recebe sticky */}
          {chapters.map((ch) => (
            <div key={ch.slug} className="chapter-slide">
              <article
                className={`chapter ${ch.className}`}
                data-step={ch.step}
              >
                <div className="chapter-visual">
                  <div className="chapter-visual-video" aria-hidden="true">
                    <iframe
                      src={vimeoSrc(ch.vimeoId, ch.vimeoHash, ch.vimeoStart)}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      title={ch.title}
                    />
                  </div>
                  <div className="ch-glass ch-glass-a" aria-hidden="true" />
                  <div className="ch-glass ch-glass-b" aria-hidden="true" />
                </div>
                <div className="chapter-info">
                  <span className="chapter-number">{ch.number}</span>
                  <h2>
                    <Link className="chapter-title-link" href={`/trabalhos?f=${ch.slug}`}>
                      {ch.title}
                    </Link>
                  </h2>
                  <Link
                    className="chapter-arrow-link"
                    href={`/trabalhos?f=${ch.slug}`}
                    aria-label={`Ver ${ch.title.toLowerCase()}`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                  <p>{ch.desc}</p>
                </div>
              </article>
            </div>
          ))}

        </div>

        {/* ③ Overlay de conteúdo do hero — some quando entra num capítulo */}
        <div className="hero-content-overlay" aria-hidden="false">
          <div className="hero-content" data-parallax=".42">
            <div className="kicker">Produzimos filmes que conectam.</div>
            <h1 className="mega-title">
              Histórias<br />que não<br />passam<span className="dot">.</span>
            </h1>
            <a className="play-link" href="#reel" data-reel-player>
              <span aria-hidden="true" />
              <strong>Assista ao reel</strong>
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
