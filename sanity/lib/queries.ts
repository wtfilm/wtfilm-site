import { groq } from 'next-sanity'

// Todos os projetos para a página /trabalhos
export const allProjectsQuery = groq`
  *[_type == "projeto"] | order(ordem asc) {
    _id,
    titulo,
    slug,
    kicker,
    meta,
    categoria,
    cardSize,
    cardGlow,
    destaque,
    thumbnail
  }
`

// Um projeto pelo slug (página /trabalhos/[slug])
export const projectBySlugQuery = groq`
  *[_type == "projeto" && slug.current == $slug][0] {
    _id,
    titulo,
    kicker,
    meta,
    categoria,
    vimeoId,
    vimeoHash,
    duracao,
    cliente,
    agencia,
    direcao,
    ano,
    servicos,
    lead,
    tratamento,
    descricaoCompleta,
    frames[] {
      kicker,
      legenda,
      imagem { asset-> { url } }
    },
    makingOf[] {
      kicker,
      titulo,
      tamanho,
      imagem { asset-> { url } }
    },
    resultados[] {
      label,
      valor
    }
  }
`

// Página Home (singleton)
export const homePageQuery = groq`
  *[_type == "paginaHome"][0] {
    heroVimeoId,
    heroVimeoHash,
    heroKicker,
    heroTitulo,
    heroCtaLabel
  }
`

// Página Sobre (singleton)
export const sobrePageQuery = groq`
  *[_type == "paginaSobre"][0] {
    kicker,
    titulo,
    lead,
    corpo,
    ctaLabel,
    ctaUrl
  }
`

// Página Contato (singleton)
export const contatoPageQuery = groq`
  *[_type == "paginaContato"][0] {
    titulo,
    lead,
    whatsappUrl,
    email
  }
`

// Configuração global (sidebar, redes sociais)
export const globalConfigQuery = groq`
  *[_type == "configuracaoGlobal"][0] {
    nomeDoSite,
    copyright,
    instagram,
    vimeo,
    youtube,
    linkedin,
    logo { asset-> { url } }
  }
`
