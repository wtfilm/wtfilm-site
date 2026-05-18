import Link from 'next/link'
import { client } from '../../sanity/lib/client'
import { sobrePageQuery } from '../../sanity/lib/queries'

export const metadata = { title: 'Sobre · wtfilm' }
export const revalidate = 60 // revalida a cada 60 segundos

// Dados fallback (usados enquanto Sanity estiver vazio)
const fallbackClients = [
  { nome: 'Nubank',             logo: { asset: { url: '/logos/nubank.png' } } },
  { nome: 'Google',             logo: { asset: { url: '/logos/google.png' } } },
  { nome: 'Disney+',            logo: { asset: { url: '/logos/disney-plus.png' } } },
  { nome: 'Warner Bros',        logo: { asset: { url: '/logos/warner-bros.png' } } },
  { nome: 'Universal Pictures', logo: { asset: { url: '/logos/universal-pictures.png' } } },
  { nome: 'ESPN',               logo: { asset: { url: '/logos/espn.png' } } },
  { nome: 'Intel',              logo: { asset: { url: '/logos/intel.png' } } },
  { nome: 'Nestlé',             logo: { asset: { url: '/logos/nestle.png' } } },
  { nome: 'Danone',             logo: { asset: { url: '/logos/danone.png' } } },
  { nome: 'Fila',               logo: { asset: { url: '/logos/fila.png' } } },
  { nome: 'Qualcomm',           logo: { asset: { url: '/logos/qualcomm.png' } } },
  { nome: 'Omelete',            logo: { asset: { url: '/logos/omelete.png' } } },
  { nome: 'CCXP',               logo: { asset: { url: '/logos/ccxp.webp' } } },
  { nome: 'Live',               logo: { asset: { url: '/logos/live.png' } } },
  { nome: 'Mondial',            logo: { asset: { url: '/logos/mondial.png' } } },
]

const fallback = {
  kicker: 'Sobre',
  titulo: 'wtfilm é uma produtora audiovisual brasileira.',
  lead: 'Criamos filmes, campanhas, conteúdos e experimentos visuais para marcas, artistas e projetos culturais que precisam de imagem com presença.',
  corpo: 'Trabalhamos com equipes flexíveis, escolhidas conforme a natureza de cada produção. O processo combina direção criativa, produção, captação, pós-produção e acabamento visual, mantendo o olhar cinematográfico como eixo comum.',
  ctaLabel: 'Falar com a wtfilm →',
  ctaUrl: '/contato',
  reelVimeoId: '699221144',
  reelVimeoHash: '41566b7914',
  clientes: fallbackClients,
}

export default async function SobrePage() {
  const data = await client.fetch(sobrePageQuery).catch(() => null)
  const page = {
    ...fallback,
    ...data,
    clientes: (data?.clientes?.length ? data.clientes : fallback.clientes),
  }

  const reelSrc = page.reelVimeoId
    ? `https://player.vimeo.com/video/${page.reelVimeoId}${page.reelVimeoHash ? `?h=${page.reelVimeoHash}&` : '?'}badge=0&autopause=0&background=1&loop=1&muted=1&autoplay=1`
    : `https://player.vimeo.com/video/699221144?h=41566b7914&badge=0&autopause=0&background=1&loop=1&muted=1&autoplay=1`

  const track = [...page.clientes, ...page.clientes]

  return (
    <main className="site">
      <section className="page about-page">
        <div className="about-copy">
          <span className="kicker">{page.kicker}</span>
          <h1 className="page-title">{page.titulo}</h1>
          <p className="lead">{page.lead}</p>
          {page.corpo && <p>{page.corpo}</p>}
          <Link className="button reel-type" href={page.ctaUrl}>
            {page.ctaLabel}
          </Link>
        </div>

        <div className="about-reel">
          <iframe
            src={reelSrc}
            allow="autoplay; fullscreen; picture-in-picture"
            title="wtfilm showreel"
          />
        </div>

        <div className="client-strip" aria-label="Clientes">
          <p className="client-strip-label">Nossos Clientes:</p>
          <div className="client-marquee">
            <div className="client-track">
              {track.map((c, i) => (
                <span key={i} className="client-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.logo?.asset?.url} alt={c.nome} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
