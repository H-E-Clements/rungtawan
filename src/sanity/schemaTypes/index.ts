import { type SchemaTypeDefinition } from 'sanity'
import {siteSettings} from "@/sanity/schemaTypes/siteSettings";
import {serviceCards} from "@/sanity/schemaTypes/serviceCards";
import {proposition} from "@/sanity/schemaTypes/proposition";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceCards, siteSettings, proposition],
}
