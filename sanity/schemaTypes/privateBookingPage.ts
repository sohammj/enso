import { defineField, defineType } from "sanity";

export default defineType({
  name: "privateBookingPage",
  title: "Private Booking Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Optional page heading shown at the top.",
    }),
    defineField({
      name: "pageSubtitle",
      title: "Page Subtitle / Instructions",
      type: "text",
      rows: 3,
      description: "Optional short instructions under the title.",
    }),

    defineField({
      name: "intakeFormEmbedUrl",
      title: "Intake Form Embed URL",
      type: "url",
      validation: (Rule) => Rule.required(),
      description:
        "Use the EMBED viewform URL (ends with /viewform?embedded=true). Not the /edit link.",
    }),

    defineField({
      name: "calendarEmbedUrl",
      title: "Calendar Embed URL",
      type: "url",
      validation: (Rule) => Rule.required(),
      description:
        "Use Google Calendar 'Embed code' src URL (calendar.google.com/calendar/embed?...).",
    }),

    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "sessionDurationText",
      title: "Session Duration Text",
      type: "string",
      initialValue: "1 hour",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "feeAmount",
      title: "Fee Amount",
      type: "number",
      initialValue: 1600,
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "feeCurrency",
      title: "Fee Currency",
      type: "string",
      initialValue: "₹",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "afterIntakeMessage",
      title: "After Intake Message",
      type: "text",
      rows: 3,
      initialValue: "After submitting the intake form, please message us to confirm.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "newClientLabel",
      title: "New Client Toggle Label",
      type: "string",
      initialValue: "New client — Intake + Booking",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "returningClientLabel",
      title: "Returning Client Toggle Label",
      type: "string",
      initialValue: "Returning client — Book only",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
