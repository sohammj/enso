import { defineField, defineType } from "sanity";

export default defineType({
  name: "returningClientBookingPage",
  title: "Returning Client Booking Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      initialValue: "Returning Client Booking",
    }),
    defineField({
      name: "pageSubtitle",
      title: "Page Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "calendarEmbedUrl",
      title: "Calendar Embed URL",
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

    }),
    defineField({
      name: "feeCurrency",
      title: "Fee Currency",
      type: "string",
      initialValue: "₹",
    }),
  ],
});