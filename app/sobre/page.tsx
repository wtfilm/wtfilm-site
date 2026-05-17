import Link from 'next/link'

export const metadata = { title: 'Sobre · wtfilm' }

// Logos dos clientes — substitua os textos por <img src="/logos/cliente.svg" alt="Nome" />
// quando tiver os arquivos de logo prontos
const clients = [
  'Natura', 'Vivo', 'Itaú', 'Ambev', 'Nike', 'Globo',
  'C&A', 'Samsung', 'Bradesco', 'Havaianas', 'Nubank', 'Heineken',
]

export default function SobrePage() {
  // Duplica a lista para o loop contínuo do carrossel
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

        {/* Vídeo Vimeo — substitua o vimeoId pelo ID do vídeo desejado */}
        <div className="about-reel">
          <iframe
            src="https://player.vimeo.com/video/699221144?h=41566b7914&badge=0&autopause=0&background=1&loop=1&muted=1&autoplay=1"
            allow="autoplay; fullscreen; picture-in-picture"
            title="wtfilm showreel"
          />
        </div>

        {/* Carrossel de logos */}
        <div className="client-strip" aria-label="Clientes">
          <div className="client-track">
            {track.map((name, i) => (
              <span key={i} className="client-logo">{name}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
