import { MetadataRoute } from 'next'
import { client } from '../lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://monterial-construction.com'

    // Fetch projects from Sanity
    const projects = await client.fetch(`*[_type == "project"]{ "slug": slug.current, _updatedAt }`)
    
    const projectUrls = projects.map((project: any) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(project._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...projectUrls,
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]
}
