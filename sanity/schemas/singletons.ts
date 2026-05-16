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
    defineField({ name: 'heroTitulo', title: 'Hero: Título', type: 'string', initialValue: 'Histórias que não passam' }),
    defineField({ name: 'heroCtaLabel', title: 'Hero: Texto do botão', type: 'string', initialValue: 'Assista ao reel' }),
    defineField({
      name: 'laminasVideo',
      title: 'Lâminas: Vídeos por categoria',
      type: 'array',
      description: 'Controla o vídeo de fundo de cada lâmina na home.',
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
          defineField({ name: 'vimeoId', title: 'ID do Vimeo', type: 'string' }),
          defineField({ name: 'vimeoHash', title: 'Hash do Vimeo (se privado)', type: 'string' }),
          defineField({ name: 'vimeoInicio', title: 'Início do loop (segundos)', type: 'number' }),
          defineField({ name: 'vimeoFim', title: 'Fim do loop (segundos)', type: 'number' }),
        ],
        preview: { select: { title: 'categoria', subtitle: 'vimeoId' } }
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
    defineField({ name: 'lead', title: 'Lead', type: 'text' }),
    defineField({ name: 'corpo', title: 'Texto completo', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'ctaLabel', title: 'Texto do botão', type: 'string', initialValue: 'Falar com a wtfilm →' }),
    defineField({ name: 'ctaUrl', title: 'URL do botão', type: 'string', initialValue: '/contato' }),
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
  ]
})
