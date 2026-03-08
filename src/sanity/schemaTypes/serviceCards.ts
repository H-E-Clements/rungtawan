export const serviceCards = {
    name: 'serviceCards',
    title: 'Service Cards',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Service Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'popular',
            title: 'Is this a Popular Service?',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'image',
            title: 'Service Photo',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        },
        {
            name: 'options',
            title: 'Pricing Options',
            description: 'Add different durations and costs for this service',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'option',
                    fields: [
                        { name: 'time', type: 'number', title: 'Time (minutes)' },
                        { name: 'cost', type: 'number', title: 'Cost (£)' }
                    ],
                    // This makes the list in the CMS look pretty
                    preview: {
                        select: {
                            time: 'time',
                            cost: 'cost'
                        },
                        prepare({ time, cost }: any) {
                            return {
                                title: `${time} mins — £${cost}`
                            }
                        }
                    }
                }
            ]
        },
    ],
}