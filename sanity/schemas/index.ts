import { projetoSchema } from './projeto'
import { paginaHomeSchema, paginaSobreSchema, paginaContatoSchema, configuracaoGlobalSchema } from './singletons'

export const schemaTypes = [
  projetoSchema,
  paginaHomeSchema,
  paginaSobreSchema,
  paginaContatoSchema,
  configuracaoGlobalSchema,
]
