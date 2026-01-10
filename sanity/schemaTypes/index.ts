import type { SchemaTypeDefinition } from "sanity";
import { homePage } from "./homePage";
import { program } from "./program";
import service from "./service";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, program, service],
};
