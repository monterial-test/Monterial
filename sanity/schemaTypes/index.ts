import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { settingsType } from './settings'
import { inquiryType } from './inquiry'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, settingsType, inquiryType],
}
