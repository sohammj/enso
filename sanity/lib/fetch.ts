import { sanityFetch } from "./live";

type FetchArgs = {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
};

export async function fetchFromSanity<T>({ query, params = {}, tags = [] }: FetchArgs) {
  const res = await sanityFetch<T>({
    query,
    params,
    // ✅ Next cache tags (this is what we invalidate)
    next: { tags: ["sanity", ...tags] },
    // ✅ fallback revalidate if webhook ever fails
    revalidate: 86400,
  });

  return res.data;
}
