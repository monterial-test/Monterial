import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client, urlFor } from '../../../lib/sanity'
import ProjectClient from './ProjectClient'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const projects = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`);
  return projects.map((project: { slug: string }) => ({
    slug: project.slug,
  }));
}

async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    title, titleAr, description, descriptionAr, category, categoryAr, location, locationAr, image, gallery, slug
  }`;
  try {
    const project = await client.fetch(query, { slug });
    return project;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    
    // Attempt to fetch on server for SEO
    let project = await getProject(slug);
    
    // Even if project is null (due to Node network timeout), we pass it to ProjectClient.
    // ProjectClient will fallback to using the ProjectContext data.
    
    const jsonLd = project ? {
        "@context": "https://schema.org",
        "@type": "Project",
        "name": project.title,
        "description": project.description,
        "image": project.image ? urlFor(project.image).url() : "",
        "location": {
            "@type": "Place",
            "name": project.location
        },
        "category": project.category
    } : null;

    return <ProjectClient initialProject={project} slug={slug} jsonLd={jsonLd} />
}
