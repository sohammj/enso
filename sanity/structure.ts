import type { StructureResolver } from "sanity/desk";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),

      S.listItem()
        .title("FAQ Page")
        .id("faqPage")
        .child(S.document().schemaType("faqPage").documentId("faqPage")),

      S.divider(),

      S.listItem()
        .title("Programs")
        .schemaType("program")
        .child(S.documentTypeList("program").title("Programs")),

      S.listItem()
        .title("Services")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Services")),
    ]);
