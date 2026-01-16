import { fetchFromSanity } from "./fetch";
import { privateBookingPageQuery } from "./queries";
import type { PrivateBookingPage } from "./types";

export async function fetchPrivateBookingPage() {
  return fetchFromSanity<PrivateBookingPage>({
    query: privateBookingPageQuery,
  });
}
