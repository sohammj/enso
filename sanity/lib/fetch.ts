import { sanityFetch } from "./live";

type FetchArgs = {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
};

export async function fetchFromSanity<T>({
  query,
  params = {},
  tags = [],
}: FetchArgs): Promise<T> {
  const res = await sanityFetch({
    query,
    params,
    // IMPORTANT: don't use `next:` here because your next-sanity types don't support it
  });

  return res.data as T;
}
