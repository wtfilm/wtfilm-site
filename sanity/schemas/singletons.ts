import { defineType, defineField } from 'sanity'

export const paginaHomeSchema = defineType({
  name: 'paginaHome',
  title: 'Página: Home',
  type: 'document',
  fields: [
    defineField({ name: 'heroVimeoId', title: 'Hero: ID do Vimeo', type: 'string' }),
    defineField({ name: 'heroVimeoHash', title: 'Hero: Hash do Vimeo (se privado)', type: 'string' }),
    defineField({ name: 'heroVimeoInicio', title: 'Hero: Início do loop (segundos)', type: 'number', description: 'Ex: 88 para começar em 1m28s. Deixe vazio para início do vídeo.' }),
    defineField({ name: 'heroVimeoFim', title: 'Hero: Fim do loop (segundos)', type: 'number', description: 'Ex: 120 para parar em 2min. Deixe vazio para loop completo.' }),
    defineField({ name: 'heroKicker', title: 'Hero: Kicker', type: 'string', initialValue: 'Produzimos filmes que conectam.' }),
    defineField({ name: 'heroTitulo', title: 'Hero: Título (uma linha por quebra)', type: 'text', rows: 3, initialValue: 'Histórias\nque não\npassam', description: 'Cada linha vira uma linha no site. Use Enter para quebrar.' }),
    defineField({ name: 'heroCtaLabel', title: 'Hero: Texto do botão de reel', type: 'string', initialValue: 'Assista ao reel' }),
    defineField({ name: 'heroReelVimeoId', title: 'Reel: ID do Vimeo (vídeo que abre ao clicar no botão)', type: 'string' }),
    defineField({ name: 'heroReelVimeoHash', title: 'Reel: Hash do Vimeo (se privado)', type: 'string' }),
    defineField({
      name: 'laminas',
      title: 'Lâminas',
      type: 'array',
      description: 'Vídeo, título e texto de cada lâmina na home. A ordem aqui define a ordem na tela.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'categoria', title: 'Categoria', type: 'string', options: { list: [
            { title: 'Campanhas', value: 'campanhas' },
            { title: 'IA / Experimentos', value: 'ia' },
            { title: 'Conteúdo', value: 'conteudo' },
            { title: 'Videoclipes', value: 'videoclipes' },
            { title: 'Cinema', value: 'cinema' },
            { title: 'Animação', value: 'animacao' },
          ]}}),
          defineField({ name: 'titulo', title: 'Título da lâmina', type: 'string' }),
          defineField({ name: 'texto', title: 'Texto da lâmina', type: 'text', rows: 3 }),
          defineField({ name: 'ctaLabel', title: 'Texto do botão', type: 'string', initialValue: 'Ver projetos →' }),
          defineField({ name: 'ctaUrl', title: 'Link do botão', type: 'string', initialValue: '/trabalhos' }),
          defineField({ name: 'vimeoId', title: 'ID do Vimeo (fundo da lâmina)', type: 'string' }),
          defineField({ name: 'vimeoHash', title: 'Hash do Vimeo (se privado)', type: 'string' }),
          defineField({ name: 'vimeoStart', title: 'Início do loop (segundos)', type: 'number', description: 'Ex: 88 para começar em 1m28s. Deixe vazio para o início.' }),
        ],
        preview: { select: { title: 'titulo', subtitle: 'categoria' } }
      }]
    }),
  ]
})

export const paginaSobreSchema = defineType({
  name: 'paginaSobre',
  title: 'Página: Sobre',
  type: 'document',
  fields: [
    defineField({ name: 'kicker', title: 'Kicker', type: 'string', initialValue: 'Sobre' }),
    defineField({ name: 'titulo', title: 'Título', type: 'string' }),
    defineField({ name: 'lead', title: 'Lead (primeiro parágrafo)', type: 'text', rows: 3 }),
    defineField({ name: 'corpo', title: 'Texto (segundo parágrafo)', type: 'text', rows: 4 }),
    defineField({ name: 'ctaLabel', title: 'Texto do botão', type: 'string', initialValue: 'Falar com a wtfilm →' }),
    defineField({ name: 'ctaUrl', title: 'URL do botão', type: 'string', initialValue: '/contato' }),
    defineField({ name: 'reelVimeoId', title: 'Showreel: ID do Vimeo', type: 'string', description: 'Vídeo de fundo da página Sobre' }),
    defineField({ name: 'reelVimeoHash', title: 'Showreel: Hash do Vimeo (se privado)', type: 'string' }),
    defineField({
      name: 'clientes',
      title: 'Carrossel de clientes',
      type: 'array',
      description: 'Logos em branco (PNG/SVG). Arraste para reordenar.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'nome', title: 'Nome do cliente', type: 'string' }),
          defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: false } }),
        ],
        preview: { select: { title: 'nome', media: 'logo' } }
      }]
    }),
  ]
})

export const paginaContatoSchema = defineType({
  name: 'paginaContato',
  title: 'Página: Contato',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'string', initialValue: 'Vamos criar algo impossível de ignorar?' }),
    defineField({ name: 'lead', title: 'Lead', type: 'text' }),
    defineField({ name: 'whatsappUrl', title: 'URL do WhatsApp', type: 'url' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string', initialValue: 'contato@wtfilm.com.br' }),
  ]
})

export const configuracaoGlobalSchema = defineType({
  name: 'configuracaoGlobal',
  title: 'Configuração Global',
  type: 'document',
  fields: [
    defineField({ name: 'nomeDoSite', title: 'Nome do site', type: 'string', initialValue: 'wtfilm' }),
    defineField({ name: 'copyright', title: 'Copyright', type: 'string', initialValue: '© 2026 wtfilm.' }),
    defineField({ name: 'instagram', title: 'URL Instagram', type: 'url' }),
    defineField({ name: 'vimeo', title: 'URL Vimeo', type: 'url' }),
    defineField({ name: 'youtube', title: 'URL YouTube', type: 'url' }),
    defineField({ name: 'linkedin', title: 'URL LinkedIn', type: 'url' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'favicon', title: 'Favicon (ícone da aba do browser)', type: 'image', description: 'PNG ou ICO, quadrado, mínimo 32×32px.' }),
  ]
})
