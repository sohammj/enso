// import { defineField, defineType } from "sanity";
    import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [


    // ...inside fields: [...]
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

    defineField({
      name: "seoTitle",
      title: "SEO title (optional)",
      type: "string",
      description: "Overrides the page title shown in search results.",
      validation: (r) => r.max(60).warning("Keep search titles near 60 characters."),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description (optional)",
      type: "text",
      rows: 3,
      description: "Overrides the description shown in search results.",
      validation: (r) => r.max(160).warning("Keep search descriptions near 160 characters."),
    }),
    defineField({
      name: "seoImage",
      title: "Social sharing image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),

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
      of: [{ type: "block" }],
      validation: (r) => r.min(1),
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
