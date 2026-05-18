/**
 * wtfilm — Seed do Sanity
 *
 * Popula o Sanity com os dados iniciais do site (lâminas, sobre, contato, config global).
 *
 * PRÉ-REQUISITO: adicione SANITY_TOKEN ao .env.local
 *   1. Acesse https://sanity.io/manage → seu projeto → API → Tokens
 *   2. Crie um token com permissão "Editor"
 *   3. Adicione ao .env.local:  SANITY_TOKEN=seu-token-aqui
 *
 * COMO RODAR (no Terminal, dentro de wtfilm-site/):
 *   node --env-file=.env.local scripts/seed.mjs
 */

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET
const token     = process.env.SANITY_TOKEN

if (!projectId || !dataset) {
  console.error('❌ Faltam NEXT_PUBLIC_SANITY_PROJECT_ID ou NEXT_PUBLIC_SANITY_DATASET no .env.local')
  process.exit(1)
}
if (!token) {
  console.error('❌ Falta SANITY_TOKEN no .env.local')
  console.error('   Crie um token em: https://sanity.io/manage → API → Tokens → Add API token (Editor)')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false })

// ── Dados ──────────────────────────────────────────────────────────────────

const laminas = [
  {
    _key: 'campanhas',
    categoria: 'campanhas',
    titulo: 'Campanhas',
    texto: 'Imagem de marca com desejo, presença e precisão.',
    ctaLabel: 'Ver projetos →',
    ctaUrl: '/trabalhos?f=campanhas',
    vimeoId: '804424468',
    vimeoHash: '',
    vimeoStart: 0,
  },
  {
    _key: 'ia',
    categoria: 'ia',
    titulo: 'IA / Experimentos',
    texto: 'Novas linguagens sem perder direção.',
    ctaLabel: 'Ver projetos →',
    ctaUrl: '/trabalhos?f=ia',
    vimeoId: '1192826549',
    vimeoHash: 'a4dd577f3a',
    vimeoStart: 0,
  },
  {
    _key: 'conteudo',
    categoria: 'conteudo',
    titulo: 'Conteúdo',
    texto: 'Presença humana, ritmo social e intenção visual.',
    ctaLabel: 'Ver projetos →',
    ctaUrl: '/trabalhos?f=conteudo',
    vimeoId: '806033496',
    vimeoHash: '',
    vimeoStart: 0,
  },
  {
    _key: 'videoclipes',
    categoria: 'videoclipes',
    titulo: 'Videoclipes',
    texto: 'Cor, corpo e movimento como narrativa.',
    ctaLabel: 'Ver projetos →',
    ctaUrl: '/trabalhos?f=videoclipes',
    vimeoId: '302965213',
    vimeoHash: '',
    vimeoStart: 0,
  },
  {
    _key: 'cinema',
    categoria: 'cinema',
    titulo: 'Cinema',
    texto: 'Atmosfera, silêncio e personagem.',
    ctaLabel: 'Ver projetos →',
    ctaUrl: '/trabalhos?f=cinema',
    vimeoId: '831215945',
    vimeoHash: '',
    vimeoStart: 88,
  },
  {
    _key: 'animacao',
    categoria: 'animacao',
    titulo: 'Animação',
    texto: 'Mundos imaginados com textura de filme.',
    ctaLabel: 'Ver projetos →',
    ctaUrl: '/trabalhos?f=animacao',
    vimeoId: '804416179',
    vimeoHash: '',
    vimeoStart: 11,
  },
]

// ── Seed ───────────────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Iniciando seed do Sanity...\n')

  // Página Home
  try {
    await client.createOrReplace({
      _id: 'paginaHome',
      _type: 'paginaHome',
      heroVimeoId: '699221144',
      heroVimeoHash: '41566b7914',
      heroKicker: 'Produzimos filmes que conectam.',
      heroTitulo: 'Histórias que não passam',
      heroCtaLabel: 'Assista ao reel',
      heroReelVimeoId: '699221144',
      heroReelVimeoHash: '41566b7914',
      laminas,
    })
    console.log('✅ Página: Home — 6 lâminas criadas')
  } catch (e) {
    console.error('❌ Erro na Home:', e.message)
  }

  // Página Sobre
  try {
    await client.createOrReplace({
      _id: 'paginaSobre',
      _type: 'paginaSobre',
      kicker: 'Sobre',
      titulo: 'wtfilm é uma produtora audiovisual brasileira.',
      lead: 'Criamos filmes, campanhas, conteúdos e experimentos visuais para marcas, artistas e projetos culturais que precisam de imagem com presença.',
      corpo: 'Trabalhamos com equipes flexíveis, escolhidas conforme a natureza de cada produção. O processo combina direção criativa, produção, captação, pós-produção e acabamento visual, mantendo o olhar cinematográfico como eixo comum.',
      ctaLabel: 'Falar com a wtfilm →',
      ctaUrl: '/contato',
      reelVimeoId: '699221144',
      reelVimeoHash: '41566b7914',
    })
    console.log('✅ Página: Sobre')
  } catch (e) {
    console.error('❌ Erro no Sobre:', e.message)
  }

  // Página Contato
  try {
    await client.createOrReplace({
      _id: 'paginaContato',
      _type: 'paginaContato',
      titulo: 'Vamos criar algo impossível de ignorar?',
      lead: 'A wtfilm está aberta a novos projetos. Fale com a gente.',
      email: 'contato@wtfilm.com.br',
    })
    console.log('✅ Página: Contato')
  } catch (e) {
    console.error('❌ Erro no Contato:', e.message)
  }

  // Configuração Global
  try {
    await client.createOrReplace({
      _id: 'configuracaoGlobal',
      _type: 'configuracaoGlobal',
      nomeDoSite: 'wtfilm',
      copyright: '© 2026 wtfilm.',
      instagram: 'https://instagram.com/wtfilm',
      vimeo: 'https://vimeo.com/wtfilm',
      youtube: 'https://youtube.com/@wtfilm',
      linkedin: 'https://linkedin.com/company/wtfilm',
    })
    console.log('✅ Configuração Global')
  } catch (e) {
    console.error('❌ Erro no Config:', e.message)
  }

  console.log('\n🎉 Seed concluído!')
  console.log('   Acesse o Studio para revisar e editar:')
  console.log('   https://wtfilm-site.vercel.app/studio\n')
}

seed()
