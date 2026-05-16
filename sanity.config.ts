import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Monterial Admin',

  projectId: 'dhtn8py6',
  dataset: 'production',
  basePath: '/monterial-hq/studio',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schema.types,
  },
})
