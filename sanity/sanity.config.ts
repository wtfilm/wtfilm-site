import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'wtfilm',
  title: 'wtfilm',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('wtfilm')
          .items([
            S.documentTypeListItem('projeto').title('Projetos'),
            S.divider(),
            S.listItem().title('Página: Home').child(
              S.document().schemaType('paginaHome').documentId('paginaHome')
            ),
            S.listItem().title('Página: Sobre').child(
              S.document().schemaType('paginaSobre').documentId('paginaSobre')
            ),
            S.listItem().title('Página: Contato').child(
              S.document().schemaType('paginaContato').documentId('paginaContato')
            ),
            S.divider(),
            S.listItem().title('Configuração Global').child(
              S.document().schemaType('configuracaoGlobal').documentId('configuracaoGlobal')
            ),
          ])
    }),
  ],
  schema: { types: schemaTypes },
})
