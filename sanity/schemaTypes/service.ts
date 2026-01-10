import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),

    defineField({ name: "status", title: "Status", type: "string", options: { list: ["active", "hidden"] }, initialValue: "active" }),

    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),

    // Use IMAGE (not file) so urlFor works consistently
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "preview",
      title: "Preview (optional)",
      description: "Short card preview. If empty, we use the first description paragraph.",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description (paragraphs)",
      type: "array",
      of: [{ type: "text" }],
      validation: (r) => r.min(1),
    }),

    defineField({
      name: "cta",
      title: "CTA",
      type: "object",
      fields: [
        defineField({ name: "tagline", title: "Tagline", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({ name: "text", title: "Button text", type: "string" }),
        defineField({ name: "href", title: "Link (URL or path)", type: "string" }),
      ],
    }),
    defineField({
      name: "order",
      title: "Order (optional)",
      type: "number",
      description: "Lower comes first. If empty, newest first.",
    }),
  ],
});
