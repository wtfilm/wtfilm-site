import Link from 'next/link'

export const metadata = { title: 'Sobre · wtfilm' }

const clients = [
  { file: 'nubank.png',           alt: 'Nubank' },
  { file: 'google.png',           alt: 'Google' },
  { file: 'disney-plus.png',      alt: 'Disney+' },
  { file: 'warner-bros.png',      alt: 'Warner Bros' },
  { file: 'universal-pictures.png', alt: 'Universal Pictures' },
  { file: 'espn.png',             alt: 'ESPN' },
  { file: 'intel.png',            alt: 'Intel' },
  { file: 'nestle.png',           alt: 'Nestlé' },
  { file: 'danone.png',           alt: 'Danone' },
  { file: 'converse.png',         alt: 'Converse' },
  { file: 'fila.png',             alt: 'Fila' },
  { file: 'acer.png',             alt: 'Acer' },
  { file: 'qualcomm.png',         alt: 'Qualcomm' },
  { file: 'enel.svg',             alt: 'Enel' },
  { file: 'perdigao.png',         alt: 'Perdigão' },
  { file: 'omelete.png',          alt: 'Omelete' },
  { file: 'iron-studios.png',     alt: 'Iron Studios' },
  { file: 'ccxp.webp',            alt: 'CCXP' },
  { file: 'live.png',             alt: 'Live' },
  { file: 'mondial.png',          alt: 'Mondial' },
]

export default function SobrePage() {
  const track = [...clients, ...clients]

  return (
    <main className="site">
      <section className="page about-page">
        <div className="about-copy">
          <span className="kicker">Sobre</span>
          <h1 className="page-title">wtfilm é uma produtora audiovisual brasileira.</h1>
          <p className="lead">
            Criamos filmes, campanhas, conteúdos e experimentos visuais para marcas,
            artistas e projetos culturais que precisam de imagem com presença.
          </p>
          <p>
            Trabalhamos com equipes flexíveis, escolhidas conforme a natureza de cada
            produção. O processo combina direção criativa, produção, captação,
            pós-produção e acabamento visual, mantendo o olhar cinematográfico como
            eixo comum.
          </p>
          <Link className="button reel-type" href="/contato">
            Falar com a wtfilm →
          </Link>
        </div>

        <div className="about-reel">
          <iframe
            src="https://player.vimeo.com/video/699221144?h=41566b7914&badge=0&autopause=0&background=1&loop=1&muted=1&autoplay=1"
            allow="autoplay; fullscreen; picture-in-picture"
            title="wtfilm showreel"
          />
        </div>

        <div className="client-strip" aria-label="Clientes">
          <p className="client-strip-label">Nossos Clientes</p>
          <div className="client-track">
            {track.map((c, i) => (
              <span key={i} className="client-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/logos/${c.file}`} alt={c.alt} />
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
