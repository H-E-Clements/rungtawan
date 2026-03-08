import { client } from './client'

export async function getServices() {
    return await client.fetch(`*[_type == "serviceCards"]{
    _id,
    title,
    description,
    options[]{
      time,
      cost
    },
    "imgSource": image,
    popular
  }`, {}, { next: { revalidate: 60 } })
}

export async function getSiteSettings() {
    return await client.fetch(
        `*[_type == "siteSettings"][0]{
            aboutImage,
            aboutTitle,
            aboutDescription
        }`,
        {},
        { next: { revalidate: 60 } }
    );
}

export async function getProposition() {
    return await client.fetch(
        `*[_type == "proposition"][0]{
            cards[]{
                title,
                description,
                cta,
                dest,
                "imgSource": imgSource,
            }
        }`,
        {},
        { next: { revalidate: 60 } }
    );
}