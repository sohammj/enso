import { defineField, defineType } from "sanity";

export default defineType({
  name: "interstitial",
  title: "Interstitial Popup",
  type: "document",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "priority",
      title: "Priority (higher wins if multiple)",
      type: "number",
      initialValue: 10,
      validation: (Rule) => Rule.min(0).max(100),
    }),

    defineField({
      name: "startAt",
      title: "Start date & time",
      type: "datetime",
      description: "When the popup becomes eligible to show.",
    }),

    defineField({
      name: "endAt",
      title: "End date & time",
      type: "datetime",
      description: "After this time, the popup will stop showing automatically.",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.max(140),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "Check it out",
      validation: (Rule) => Rule.max(40),
    }),

    defineField({
      name: "ctaUrl",
      title: "CTA Link",
      type: "url",
    }),

    defineField({
      name: "showFrequency",
      title: "Show frequency",
      type: "string",
      initialValue: "session",
      options: {
        list: [
          { title: "Every page load", value: "always" },
          { title: "Once per session", value: "session" },
          { title: "Once per day", value: "daily" },
        ],
        layout: "radio",
      },
    }),
  ],

  preview: {
    select: { title: "title", enabled: "enabled", startAt: "startAt", endAt: "endAt" },
    prepare({ title, enabled, startAt, endAt }) {
      const status = enabled ? "✅ Enabled" : "⛔ Disabled";
      const window = [startAt, endAt].filter(Boolean).join(" → ");
      return { title: title || "Interstitial", subtitle: `${status}${window ? ` • ${window}` : ""}` };
    },
  },
});
