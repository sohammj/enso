import type { SchemaTypeDefinition } from "sanity";
import { homePage } from "./homePage";
import { program } from "./program";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, program],
};
