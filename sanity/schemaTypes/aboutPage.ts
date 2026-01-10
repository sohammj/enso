import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page (Our Journey)",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      initialValue: "Our Journey",
    }),

    defineField({
      name: "photos",
      title: "Journey Photos (3)",
      type: "object",
      fields: [
        defineField({
          name: "photo1",
          title: "Photo 1 (Panel 01)",
          type: "image",
          options: { hotspot: true },
          validation: (r) => r.required(),
        }),
        defineField({
          name: "photo2",
          title: "Photo 2 (Panel 02)",
          type: "image",
          options: { hotspot: true },
          validation: (r) => r.required(),
        }),
        defineField({
          name: "photo3",
          title: "Photo 3 (Panel 03)",
          type: "image",
          options: { hotspot: true },
          validation: (r) => r.required(),
        }),
      ],
    }),

    defineField({
      name: "steps",
      title: "Journey Steps Copy",
      type: "object",
      fields: [
        defineField({
          name: "s1",
          title: "Step 01",
          type: "object",
          fields: [
            defineField({ name: "no", title: "Step No", type: "string", initialValue: "01" }),
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Body", type: "text", rows: 4, validation: (r) => r.required() }),
          ],
        }),

        defineField({
          name: "s2",
          title: "Step 02",
          type: "object",
          fields: [
            defineField({ name: "no", title: "Step No", type: "string", initialValue: "02" }),
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Body", type: "text", rows: 5, validation: (r) => r.required() }),
          ],
        }),

        defineField({
          name: "s3",
          title: "Step 03",
          type: "object",
          fields: [
            defineField({ name: "no", title: "Step No", type: "string", initialValue: "03" }),
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Body", type: "text", rows: 4, validation: (r) => r.required() }),
          ],
        }),

        defineField({
          name: "s4",
          title: "Step 04/05 Panel (No Photos)",
          type: "object",
          fields: [
            defineField({ name: "topLeftTitle", title: "Top Left Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "topLeftBody", title: "Top Left Body", type: "text", rows: 4, validation: (r) => r.required() }),

            defineField({ name: "bottomLeftStep", title: "Bottom Left Step No", type: "string", initialValue: "04" }),
            defineField({ name: "topRightStep", title: "Top Right Step No", type: "string", initialValue: "05" }),

            defineField({ name: "bottomRightTitle", title: "Bottom Right Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "bottomRightBody", title: "Bottom Right Body", type: "text", rows: 5, validation: (r) => r.required() }),
          ],
        }),
      ],
    }),
  ],
});
