import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAr',
      title: 'Title (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location (English)',
      type: 'string',
    }),
    defineField({
      name: 'locationAr',
      title: 'Location (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category (English)',
      type: 'string',
      options: {
        list: [
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Infrastructure', value: 'Infrastructure' },
          { title: 'Residential', value: 'Residential' },
        ],
      },
    }),
    defineField({
      name: 'categoryAr',
      title: 'Category (Arabic)',
      type: 'string',
      options: {
        list: [
          { title: 'تجاري', value: 'تجاري' },
          { title: 'بنية تحتية', value: 'بنية تحتية' },
          { title: 'سكني', value: 'سكني' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
    }),
    defineField({
      name: 'descriptionAr',
      title: 'Description (Arabic)',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional images for the project gallery',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'string',
      description: 'Comma separated keywords',
    }),
  ],
})
