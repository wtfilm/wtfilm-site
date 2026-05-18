import { defineType, defineField } from 'sanity'

export const projetoSchema = defineType({
  name: 'projeto',
  title: 'Projeto',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'titulo' }, validation: R => R.required() }),
    defineField({ name: 'kicker', title: 'Kicker (ex: "Campanha")', type: 'string' }),
    defineField({ name: 'meta', title: 'Meta (ex: "Natura · filme principal")', type: 'string' }),
    defineField({
      name: 'categoria', title: 'Categoria', type: 'string', validation: R => R.required(),
      options: { list: [
        { title: 'Campanhas', value: 'campanhas' },
        { title: 'IA / Experimentos', value: 'ia' },
        { title: 'Conteúdo', value: 'conteudo' },
        { title: 'Videoclipes', value: 'videoclipes' },
        { title: 'Cinema', value: 'cinema' },
        { title: 'Animação', value: 'animacao' },
      ]}
    }),
    defineField({
      name: 'cardSize', title: 'Tamanho do card', type: 'string', initialValue: 'mid',
      options: { list: ['wide', 'mid', 'tall', 'small'] }
    }),
    defineField({ name: 'cardGlow', title: 'Cor do glow (oklch)', type: 'string', description: 'Ex: oklch(60% 0.24 18 / .38)' }),
    defineField({ name: 'destaque', title: 'Em destaque na Home?', type: 'boolean', initialValue: false }),
    defineField({ name: 'ordem', title: 'Ordem de exibição', type: 'number' }),
    defineField({ name: 'vimeoId', title: 'ID do Vimeo', type: 'string', description: 'Só o número. Ex: 699221144' }),
    defineField({ name: 'vimeoHash', title: 'Hash do Vimeo (se privado)', type: 'string' }),
    defineField({ name: 'vimeoInicio', title: 'Player: Início (segundos)', type: 'number', description: 'Ponto de entrada quando o vídeo abre. Deixe vazio para o início.' }),
    defineField({ name: 'vimeoFim', title: 'Player: Fim do loop no card (segundos)', type: 'number', description: 'Fim do loop do preview no card. Deixe vazio para loop completo.' }),
    defineField({ name: 'duracao', title: 'Duração (ex: "02:18")', type: 'string' }),
    defineField({ name: 'cliente', title: 'Cliente', type: 'string' }),
    defineField({ name: 'agencia', title: 'Agência', type: 'string' }),
    defineField({ name: 'direcao', title: 'Direção', type: 'string', initialValue: 'wtfilm' }),
    defineField({ name: 'ano', title: 'Ano', type: 'number' }),
    defineField({ name: 'servicos', title: 'Serviços', type: 'string', description: 'Ex: Filme, captação, pós' }),
    defineField({ name: 'lead', title: 'Lead (texto principal)', type: 'text' }),
    defineField({ name: 'tratamento', title: 'Tratamento visual', type: 'text' }),
    defineField({ name: 'descricaoCompleta', title: 'Descrição completa', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'frames', title: 'Frames', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'kicker', title: 'Kicker', type: 'string' },
        { name: 'legenda', title: 'Legenda', type: 'string' },
        { name: 'imagem', title: 'Imagem', type: 'image', options: { hotspot: true } },
      ]}]
    }),
    defineField({
      name: 'makingOf', title: 'Making of', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'kicker', title: 'Kicker', type: 'string' },
        { name: 'titulo', title: 'Título', type: 'string' },
        { name: 'imagem', title: 'Imagem', type: 'image', options: { hotspot: true } },
        { name: 'tamanho', title: 'Tamanho', type: 'string', options: { list: ['wide', 'mid'] } },
      ]}]
    }),
    defineField({
      name: 'resultados', title: 'Resultados', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'label', title: 'Label (ex: "Lembrança de marca")', type: 'string' },
        { name: 'valor', title: 'Valor (ex: "+37%")', type: 'string' },
      ]}]
    }),
    defineField({
      name: 'isMoodboard',
      title: 'É moodboard?',
      type: 'boolean',
      initialValue: false,
      description: 'Moodboards exigem thumbnail personalizada (campo obrigatório abaixo).',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail do card',
      type: 'image',
      options: { hotspot: true },
      description: 'Obrigatória para moodboards. Nos demais, se vazia, puxamos do Vimeo automaticamente.',
      validation: R => R.custom((val, ctx) => {
        if ((ctx.document as { isMoodboard?: boolean })?.isMoodboard && !val) {
          return 'Projetos moodboard exigem uma thumbnail personalizada.'
        }
        return true
      }),
    }),
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'categoria', media: 'thumbnail' }
  }
})
