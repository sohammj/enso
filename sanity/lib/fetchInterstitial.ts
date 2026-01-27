import { client } from "./client";
import { interstitialQuery } from "./queries";

export async function fetchInterstitial() {
  return client.fetch(interstitialQuery);
}
