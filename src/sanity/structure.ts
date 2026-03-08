import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
      .title('Website Content')
      .items([
          S.documentTypeListItem('serviceCards').title('Service Cards'),

          S.listItem()
              .title('Value Proposition Section')
              .id('proposition')
              .child(
                  S.document()
                      .schemaType('proposition')
                      .documentId('proposition')
              ),

          S.divider(),

          S.listItem()
              .title('Site Photos')
              .id('siteSettings')
              .child(
                  S.document()
                      .schemaType('siteSettings')
                      .documentId('siteSettings')
              ),

          ...S.documentTypeListItems().filter(
              (listItem) => !['serviceCards', 'siteSettings', 'proposition'].includes(listItem.getId()!)
          ),
      ])
