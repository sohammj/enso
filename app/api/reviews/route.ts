import { NextResponse } from "next/server";

export const revalidate = 60; // 24 hours

export async function GET() {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID" },
      { status: 500 }
    );
  }

  // Places API (New) - Place Details
  const url = new URL(`https://places.googleapis.com/v1/places/${placeId}`);
  url.searchParams.set(
    "fields",
    [
      "displayName",
      "rating",
      "userRatingCount",
      "reviews",
      "googleMapsUri",
    ].join(",")
  );

  const res = await fetch(url.toString(), {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask":
        "displayName,rating,userRatingCount,reviews,googleMapsUri",
    },
    // ensure Next caching works
    next: { revalidate },
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: "Google Places request failed", status: res.status, text },
      { status: 500 }
    );
  }

  const data = await res.json();

  // return only what you need
  return NextResponse.json({
    name: data.displayName?.text ?? "Reviews",
    rating: data.rating ?? null,
    userRatingCount: data.userRatingCount ?? null,
    googleMapsUri: data.googleMapsUri ?? null,
    reviews: (data.reviews ?? []).slice(0, 8).map((r: any) => ({
      author: r.authorAttribution?.displayName ?? "Verified client",
      profilePhotoUrl: r.authorAttribution?.photoUri ?? null,
      rating: r.rating ?? null,
      text: r.text?.text ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
      publishTime: r.publishTime ?? "",
      googleMapsUri: r.authorAttribution?.uri ?? null,
    })),
  });
}
