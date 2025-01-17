import type { NotionBlockType } from './NotionBlockSchema'
import { z } from 'zod'
import { NotionDatabaseCellSchema, NotionDatabasePropertySchema, NotionTitleSchema } from './NotionDatabaseSchema'
import { NotionExternalFileObjectSchema, NotionFileSchema, NotionInternalFileObjectSchema } from './NotionFileSchema'
import { NotionObjectSchema } from './NotionObjectSchema'
import { NotionEmojiSchema } from './NotionTextSchema'

export const NotionPageSchema = NotionObjectSchema.extend({
  object: z.literal('page'),
  cover: NotionFileSchema.nullable(),
  icon: z.discriminatedUnion('type', [NotionEmojiSchema, NotionInternalFileObjectSchema, NotionExternalFileObjectSchema]).nullish(),
  properties: z.record(z.union([NotionDatabaseCellSchema.merge(NotionTitleSchema), NotionDatabasePropertySchema])),
})
export type NotionPageType = z.infer<typeof NotionPageSchema>

export type NotionPageWithContentsType = NotionPageType & {
  contents: NotionBlockType[]
}
