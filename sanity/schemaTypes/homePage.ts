import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",

  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "headlineLines",
          title: "Headline (lines)",
          description: "Each item becomes a new line (keeps the exact formatting).",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 3,
        }),
      ],
    }),

    defineField({
      name: "welcome",
      title: "Welcome Card",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "highlights",
          title: "Highlights",
          type: "array",
          of: [
            defineArrayMember({
              name: "homeHighlight",
              title: "Highlight",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({
                  name: "icon",
                  title: "Optional Icon Image (leave empty to use dragonfly)",
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 5 }),
        defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
      ],
    }),

    defineField({
      name: "pauseReflect",
      title: "Pause & Reflect",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({
          name: "phrases",
          title: "Phrases",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),

    defineField({
      name: "support",
      title: "Support Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
      ],
    }),
  ],

  preview: {
    select: {
      line1: "hero.headlineLines.0",
      sub: "hero.subheadline",
    },
    prepare({ line1, sub }: { line1?: string; sub?: string }) {
      return {
        title: "   ",
        subtitle: [line1, sub].filter(Boolean).join(" • "),
      };
    },
  },
});
