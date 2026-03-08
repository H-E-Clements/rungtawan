export const siteSettings = {
    name: 'siteSettings',
    title: 'Site Photos',
    type: 'document',
    fields: [
        {
            name: 'aboutImage',
            title: 'About Us Photo',
            type: 'image',
        },
        {
            name: 'aboutTitle',
            type: 'string',
            title: 'About Us Title',
            initialValue: 'Who are we?'
        },
        {
            name: 'aboutDescription',
            type: 'text',
            title: 'About Us Description',
            description: 'The main bio/description text for the about section.'
        },
    ],
}