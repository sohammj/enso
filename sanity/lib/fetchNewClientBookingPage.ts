import { fetchFromSanity } from "./fetch";
import { newClientBookingPageQuery } from "./queries";
import type { NewClientBookingPage } from "./types";

export async function fetchNewClientBookingPage() {
  return fetchFromSanity<NewClientBookingPage>({
    query: newClientBookingPageQuery,
  });
}