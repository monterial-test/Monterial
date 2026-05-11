import { structureTool } from 'sanity/structure'

export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('project').title('Projects'),
      S.documentListItem()
        .schemaType('settings')
        .id('settings')
        .title('Site Settings'),
      S.documentTypeListItem('inquiry').title('Inquiries'),
      ...S.documentTypeListItems().filter(
        (listItem: any) => !['project', 'settings', 'inquiry'].includes(listItem.getId())
      ),
    ])
