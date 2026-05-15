import Link from 'next/link'

export const metadata = { title: 'Sobre · wtfilm' }

export default function SobrePage() {
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
        <div className="about-visual" aria-hidden="true" />
      </section>
    </main>
  )
}
