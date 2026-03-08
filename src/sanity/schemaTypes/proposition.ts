export const proposition = {
    name: 'proposition',
    title: 'Value Proposition',
    type: 'document',
    fields: [
        {
            name: 'cards',
            title: 'Information Cards',
            type: 'array',
            validation: (Rule: any) => Rule.min(3).max(3),
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'description', type: 'text', title: 'Description' },
                        { name: 'imgSource', type: 'image', title: 'Image', options: { hotspot: true } },
                        { name: 'cta', type: 'string', title: 'Button Text' },
                        { name: 'dest', type: 'string', title: 'Section ID (e.g. booking)' },
                    ]
                }
            ]
        }
    ]
}