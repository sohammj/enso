import { fetchFromSanity } from "./fetch";
import { returningClientBookingPageQuery } from "./queries";
import type { ReturningClientBookingPage } from "./types";

export async function fetchReturningClientBookingPage() {
  return fetchFromSanity<ReturningClientBookingPage>({
    query: returningClientBookingPageQuery,
  });
}