// import { defineField, defineType } from "sanity";
import { defineArrayMember, defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Programs",
  type: "document",
  fields: [



    defineField({
      name: "photoStrip",
      title: "Photo Strip (Horizontal)",
      type: "array",
      of: [
        defineArrayMember({
          name: "photoStripItem",
          title: "Photo + Text",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "label", title: "Label (small)", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "caption", media: "image" },
          },
        }),
      ],
    }),


    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Ongoing", value: "ongoing" },
          { title: "Past", value: "past" },
        ],
        layout: "radio",
      },
      initialValue: "ongoing",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "label",
      title: "Small Label (optional)",
      type: "string",
      description: 'Example: "Program", "Workshop", etc.',
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle (optional)",
      type: "string",
    }),

    defineField({
      name: "preview",
      title: "Preview (optional)",
      type: "text",
      rows: 2,
      description: "Short card preview line. If empty, we use first description paragraph.",
    }),

    defineField({
      name: "description",
      title: "Description (paragraphs)",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: "icon",
      title: "Icon (optional)",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "closingQuote",
      title: "Closing Quote (optional)",
      type: "string",
      description: "Shown below the description, above the photo strip.",
    }),

    defineField({
      name: "socialFeeds",
      title: "Social Feeds (Elfsight)",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram Feed",
          type: "object",
          fields: [
            defineField({ name: "enabled", title: "Enable", type: "boolean", initialValue: false }),
            defineField({
              name: "appId",
              title: "Elfsight App ID",
              type: "string",
              description: "Example: 01e53896-4900-43b8-a6d6-058eeef9ea17",
            }),
          ],
        }),

        defineField({
          name: "linkedin",
          title: "LinkedIn Feed",
          type: "object",
          fields: [
            defineField({ name: "enabled", title: "Enable", type: "boolean", initialValue: false }),
            defineField({
              name: "appId",
              title: "Elfsight App ID",
              type: "string",
              description: "Example: 3f8dcfdc-d8f6-46ce-b581-d4ec19e07132",
            }),
          ],
        }),
      ],
    }),



    defineField({
      name: "cta",
      title: "CTA (optional)",
      type: "object",
      fields: [
        defineField({ name: "tagline", title: "Tagline", type: "string" }),
        defineField({ name: "text", title: "Button Text", type: "string" }),
        defineField({ name: "href", title: "Button Link", type: "string" }),
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
