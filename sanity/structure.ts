import type { StructureResolver } from "sanity/desk";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      ...S.documentTypeListItems().filter(
        (listItem) => !["homePage"].includes(listItem.getId() as string)
      ),
    ]);
