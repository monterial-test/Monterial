import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'headOffice',
      title: 'Head Office Address',
      type: 'string',
    }),
    defineField({
      name: 'headOfficeMapsUrl',
      title: 'Head Office Maps URL',
      type: 'url',
    }),
    defineField({
      name: 'branch1',
      title: 'Branch 1 Address',
      type: 'string',
    }),
    defineField({
      name: 'branch1MapsUrl',
      title: 'Branch 1 Maps URL',
      type: 'url',
    }),
    defineField({
      name: 'branch2',
      title: 'Branch 2 Address',
      type: 'string',
    }),
    defineField({
      name: 'branch2MapsUrl',
      title: 'Branch 2 Maps URL',
      type: 'url',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address (Public)',
      type: 'string',
    }),
    defineField({
      name: 'contactReceiverEmail',
      title: 'Contact Form Receiver Email',
      description: 'The email address that will receive messages from the Contact Us form',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'companyProfileFile',
      title: 'Company Profile (PDF)',
      type: 'file',
      options: {
        accept: '.pdf'
      }
    }),
  ],
})
