import { defineType, defineField } from 'sanity'

export const projetoSchema = defineType({
  name: 'projeto',
  title: 'Projeto',
  type: 'document',

  // ── Grupos (abas no Studio) ───────────────────────────────────────────
  groups: [
    { name: 'card',      title: '🃏 Card',       default: true },
    { name: 'video',     title: '▶️ Vídeo' },
    { name: 'moodboard', title: '🖼 Moodboard' },
    { name: 'infos',     title: 'ℹ️ Informações' },
  ],

  fields: [

    // ── ABA: Card ────────────────────────────────────────────────────────
    defineField({
      name: 'titulo', title: 'Título do projeto', type: 'string',
      validation: R => R.required(),
      group: 'card',
    }),
    defineField({
      name: 'slug', title: 'Slug (URL do projeto)', type: 'slug',
      options: { source: 'titulo' },
      validation: R => R.required(),
      description: 'Clique em "Generate" para gerar automaticamente do título.',
      group: 'card',
    }),
    defineField({
      name: 'kicker', title: 'Kicker', type: 'string',
      description: 'Texto pequeno acima do título no card. Ex: "Campanha", "Videoclipe".',
      group: 'card',
    }),
    defineField({
      name: 'meta', title: 'Meta', type: 'string',
      description: 'Linha de contexto no card. Ex: "Natura · filme principal".',
      group: 'card',
    }),
    defineField({
      name: 'categoria', title: 'Categoria', type: 'string',
      validation: R => R.required(),
      options: { list: [
        { title: 'Campanhas',        value: 'campanhas' },
        { title: 'IA / Experimentos',value: 'ia' },
        { title: 'Conteúdo',         value: 'conteudo' },
        { title: 'Videoclipes',      value: 'videoclipes' },
        { title: 'Cinema',           value: 'cinema' },
        { title: 'Animação',         value: 'animacao' },
      ]},
      group: 'card',
    }),
    defineField({
      name: 'cardSize', title: 'Tamanho do card na grade', type: 'string',
      initialValue: 'mid',
      options: { list: [
        { title: 'Largo (wide)', value: 'wide' },
        { title: 'Médio (mid)', value: 'mid' },
        { title: 'Alto (tall)', value: 'tall' },
        { title: 'Pequeno (small)', value: 'small' },
      ]},
      group: 'card',
    }),
    defineField({
      name: 'destaque', title: 'Em destaque na Home?', type: 'boolean',
      initialValue: false,
      group: 'card',
    }),
    defineField({
      name: 'ordem', title: 'Ordem de exibição', type: 'number',
      description: 'Números menores aparecem primeiro.',
      group: 'card',
    }),
    defineField({
      name: 'thumbnail', title: 'Thumbnail do card', type: 'image',
      options: { hotspot: true },
      description: 'Opcional para vídeos (se vazio, puxamos do Vimeo). Obrigatória para moodboards.',
      validation: R => R.custom((val, ctx) => {
        if ((ctx.document as { isMoodboard?: boolean })?.isMoodboard && !val)
          return 'Moodboards exigem uma thumbnail.'
        return true
      }),
      group: 'card',
    }),

    // ── ABA: Vídeo ───────────────────────────────────────────────────────
    defineField({
      name: 'isMoodboard', title: 'Este projeto é um moodboard?', type: 'boolean',
      initialValue: false,
      description: 'Ative para projetos de conteúdo/moodboard. Desative para projetos com vídeo Vimeo.',
      group: 'video',
    }),
    defineField({
      name: 'vimeoId', title: 'ID do Vimeo', type: 'string',
      description: 'Só o número. Ex: 699221144',
      group: 'video',
    }),
    defineField({
      name: 'vimeoHash', title: 'Hash do Vimeo (vídeos privados)', type: 'string',
      description: 'A parte após a barra na URL. Ex: vimeo.com/123456/abcdef → hash é "abcdef".',
      group: 'video',
    }),
    defineField({
      name: 'vimeoInicio', title: 'Ponto de entrada (segundos)', type: 'number',
      description: 'O vídeo começa a tocar neste ponto ao abrir. Deixe vazio para início.',
      group: 'video',
    }),
    defineField({
      name: 'vimeoFim', title: 'Fim do loop no card (segundos)', type: 'number',
      description: 'Onde o preview do card para de fazer loop. Deixe vazio para loop completo.',
      group: 'video',
    }),
    defineField({
      name: 'duracao', title: 'Duração do vídeo', type: 'string',
      description: 'Ex: "02:18"',
      group: 'video',
    }),

    // ── ABA: Moodboard ────────────────────────────────────────────────────
    defineField({
      name: 'blocos',
      title: 'Blocos de conteúdo',
      type: 'array',
      description: 'Adicione imagens, textos e vídeos em qualquer ordem. O layout se adapta automaticamente.',
      group: 'moodboard',
      of: [
        {
          type: 'object',
          name: 'blocoImagem',
          title: 'Imagem',
          fields: [
            defineField({ name: 'imagem', title: 'Imagem', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'caption', title: 'Legenda (opcional)', type: 'string' }),
            defineField({
              name: 'tamanho', title: 'Largura', type: 'string', initialValue: 'full',
              options: { list: [
                { title: 'Largura total', value: 'full' },
                { title: 'Metade — emparelha com a próxima imagem', value: 'half' },
              ]},
            }),
          ],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          preview: { select: { media: 'imagem', title: 'caption' }, prepare: (v: any) => ({ title: v.title || 'Imagem', media: v.media }) }
        },
        {
          type: 'object',
          name: 'blocoTexto',
          title: 'Texto',
          fields: [
            defineField({ name: 'texto', title: 'Texto', type: 'text', rows: 3 }),
            defineField({
              name: 'tipo', title: 'Tipo', type: 'string', initialValue: 'body',
              options: { list: [
                { title: 'Corpo de texto', value: 'body' },
                { title: 'Citação / nota de direção', value: 'quote' },
                { title: 'Subtítulo de seção', value: 'subtitle' },
              ]},
            }),
          ],
          preview: { select: { title: 'texto' } }
        },
        {
          type: 'object',
          name: 'blocoVideo',
          title: 'Vídeo Vimeo',
          fields: [
            defineField({ name: 'vimeoId', title: 'ID do Vimeo', type: 'string' }),
            defineField({ name: 'vimeoHash', title: 'Hash do Vimeo (se privado)', type: 'string' }),
            defineField({ name: 'legenda', title: 'Legenda (opcional)', type: 'string' }),
          ],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          preview: { select: { title: 'vimeoId' }, prepare: (v: any) => ({ title: `Vimeo: ${v.title || '—'}` }) }
        },
      ]
    }),

    // ── ABA: Informações ─────────────────────────────────────────────────
    defineField({
      name: 'descricaoCard', title: 'Descrição (painel "informações")', type: 'text',
      rows: 4,
      description: 'Texto que aparece no painel de informações ao abrir o projeto no site.',
      group: 'infos',
    }),
    defineField({ name: 'cliente',  title: 'Cliente',           type: 'string', group: 'infos' }),
    defineField({ name: 'agencia',  title: 'Agência',           type: 'string', group: 'infos' }),
    defineField({ name: 'direcao',  title: 'Direção',           type: 'string', initialValue: 'wtfilm', group: 'infos' }),
    defineField({ name: 'ano',      title: 'Ano',               type: 'number', group: 'infos' }),
    defineField({ name: 'servicos', title: 'Serviços / Formato', type: 'string', description: 'Ex: "Filme, captação, pós"', group: 'infos' }),
    defineField({ name: 'lead',     title: 'Lead (texto intro do moodboard)', type: 'text', rows: 3, group: 'infos' }),
  ],

  preview: {
    select: { title: 'titulo', subtitle: 'categoria', media: 'thumbnail' }
  }
})
