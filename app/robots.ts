import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/monterial-hq',
        },
        sitemap: 'https://monterial-construction.com/sitemap.xml',
    }
}
