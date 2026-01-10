import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";


export default defineConfig({
  name: "default",
  title: "Enso Studio",
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [deskTool({ structure }), visionTool()],
  schema,
});

