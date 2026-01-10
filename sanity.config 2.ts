import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/deskStructure";

export default defineConfig({
  name: "default",
  title: "Enso Studio",

  // ✅ THIS IS THE FIX
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    deskTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
