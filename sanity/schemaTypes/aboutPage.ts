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
      name: "subheading",
      title: "Subheading",
      type: "array",
      of: [{ type: "block" }],
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
        defineField({
          name: "photo4",
          title: "Photo 4 (Step 04 panel)",
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
      name: "steps",
      title: "Journey Steps Copy",
      type: "object",
      fields: [
        defineField({
          name: "s1",
          title: "Step 01",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),

          ],
        }),

        defineField({
          name: "s2",
          title: "Step 02",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),

          ],
        }),

        defineField({
          name: "s3",
          title: "Step 03",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),

          ],
        }),

        // ✅ NEW: Step 04 (No Photos)
        defineField({
          name: "s4",
          title: "Step 04 (No Photos)",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),

          ],
        }),

        // ✅ NEW: Step 05 (No Photos)
        defineField({
          name: "s5",
          title: "Step 05 (No Photos)",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),

          ],
        }),
      ],
    }),
  ],
});
