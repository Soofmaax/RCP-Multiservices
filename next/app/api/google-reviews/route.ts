import { NextResponse } from 'next/server';

const TTL_SECONDS = 60 * 60 * 12; // 12h

export const revalidate = TTL_SECONDS;

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ reviews: [] }, { status: 200 });
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'reviews,url');
  url.searchParams.set('key', apiKey);

  try {
    const r = await fetch(url.toString(), { next: { revalidate: TTL_SECONDS } });
    if (!r.ok) return NextResponse.json({ reviews: [] }, { status: 200 });
    const data = await r.json();

    const reviews = Array.isArray(data?.result?.reviews)
      ? data.result.reviews.slice(0, 5).map((rv: any) => ({
          author_name: rv.author_name,
          profile_photo_url: rv.profile_photo_url,
          rating: rv.rating,
          text: rv.text,
          relative_time_description: rv.relative_time_description,
          author_url: rv.author_url,
          time: rv.time,
          source: 'google',
        }))
      : [];

    return NextResponse.json({ reviews }, { status: 200 });
  } catch {
    return NextResponse.json({ reviews: [] }, { status: 200 });
  }
}