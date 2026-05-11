import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'dhtn8py6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN to potentially bypass IPv6 timeout issues on origin API
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
