import { defineArrayMember, defineField, defineType } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Frequently Asked Questions",
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      initialValue: "Answers to some common questions — gently explained.",
    }),

    defineField({
      name: "items",
      title: "FAQs",
      type: "array",
      of: [
        defineArrayMember({
          name: "faqItem",
          title: "FAQ Item",
          type: "object",
          fields: [
            defineField({
              name: "q",
              title: "Question",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "a",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "q", subtitle: "a" },
          },
        }),
      ],
    }),

    defineField({
      name: "cta",
      title: "CTA (optional)",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "CTA text",
          type: "string",
          initialValue:
            "Still unsure? Reach out and we’ll gently point you in the right direction.",
        }),
        defineField({
          name: "buttonText",
          title: "Button text",
          type: "string",
          initialValue: "Start a conversation",
        }),
        defineField({
          name: "href",
          title: "Button link",
          type: "string",
          initialValue: "/start-a-conversation",
        }),
      ],
    }),
  ],
});
