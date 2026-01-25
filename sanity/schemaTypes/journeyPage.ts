import { defineField, defineType } from "sanity";

export const journeyPage = defineType({
  name: "journeyPage",
  title: "Journey Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Our Journey",
    }),

    defineField({
      name: "photos",
      title: "Photos (3 slots)",
      type: "object",
      fields: [
        defineField({
          name: "photo1",
          title: "Photo 1 (Step 01 panel)",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "photo2",
          title: "Photo 2 (Step 02 panel)",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "photo3",
          title: "Photo 3 (Step 03 panel)",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "photo5",
          title: "Photo 5 (Step 05 panel)",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    defineField({
      name: "s1",
      title: "01",
      type: "object",
      fields: [
        defineField({ name: "no", title: "Step no", type: "string", initialValue: "01" }),
        defineField({ name: "title", title: "Title", type: "string", initialValue: "BRIEFING" }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 4,
          initialValue:
            "Meeting (in person or via video call) and discussion of the project idea. We listen to your wishes and goals to understand exactly what you want to achieve.",
        }),
      ],
    }),

    defineField({
      name: "s2",
      title: "02",
      type: "object",
      fields: [
        defineField({ name: "no", title: "Step no", type: "string", initialValue: "02" }),
        defineField({ name: "title", title: "Title", type: "string", initialValue: "ANALYTICS" }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 4,
          initialValue:
            "After prepayment, we conduct a comprehensive market analysis, study competitors, and identify the target audience. Based on the collected information, we prepare the project's technical specification (TS) and agree on it with you.",
        }),
      ],
    }),

    defineField({
      name: "s3",
      title: "03",
      type: "object",
      fields: [
        defineField({ name: "no", title: "Step no", type: "string", initialValue: "03" }),
        defineField({ name: "title", title: "Title", type: "string", initialValue: "CONCEPT" }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 4,
          initialValue:
            "We are starting to develop the design of the first page. We create a concept and present it to you. After receiving feedback, we make the necessary adjustments and approve the final version.",
        }),
      ],
    }),

    defineField({
      name: "s4",
      title: "04 + 05 Panel",
      type: "object",
      fields: [
        defineField({
          name: "topLeftTitle",
          title: "Top-left Title",
          type: "string",
          initialValue: "DESIGN-PROJECT",
        }),
        defineField({
          name: "topLeftBody",
          title: "Top-left Body",
          type: "text",
          rows: 4,
          initialValue:
            "Based on the approved concept, we are developing the design of all other pages. We present each page and coordinate it with you to make sure that the result meets your expectations.",
        }),
        defineField({
          name: "topRightStep",
          title: "Top-right Step no",
          type: "string",
          initialValue: "05",
        }),
        defineField({
          name: "bottomLeftStep",
          title: "Bottom-left Step no",
          type: "string",
          initialValue: "04",
        }),
        defineField({
          name: "bottomRightTitle",
          title: "Bottom-right Title",
          type: "string",
          initialValue: "DEVELOPMENT",
        }),
        defineField({
          name: "bottomRightBody",
          title: "Bottom-right Body",
          type: "text",
          rows: 4,
          initialValue:
            "At the final stage, we begin the project's layout and development. We are presenting the completed website to you for review. We make any necessary adjustments, if required, and upon completion, sign the acceptance certificate, finalizing the project in accordance with all your requirements.",
        }),
      ],
    }),
  ],
});
