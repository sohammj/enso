import type { SchemaTypeDefinition } from "sanity";
import { homePage } from "./homePage";
import { program } from "./program";
import service from "./service";
import { faqPage } from "./faqPage";
import { aboutPage } from "./aboutPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, program, service,faqPage, aboutPage],
};
