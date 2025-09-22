/**
 * Netlify Function: google-reviews
 * - Exposes reviews for the frontend without exposing Google API key
 * - Set environment variables in Netlify dashboard:
 *   - GOOGLE_MAPS_API_KEY
 *   - GOOGLE_PLACE_ID
 *
 * The function is served at:
 *   /.netlify/functions/google-reviews
 * With redirect below, also at:
 *   /api/google-reviews
 */

const ALLOWED_ORIGIN = '*';

// Simple in-memory cache per function instance (persists across warm invocations)
type CacheShape = { ts: number; payload: { reviews: any[] } };
let CACHE: CacheShape | null = null;
const TTL_MS = 12 * 60 * 60 * 1000; // 12h

export default async (request: Request): Promise<Response> => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  if (request.method !== 'GET') {
    return json({ reviews: [] }, 405);
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    // Not configured yet: return empty list
    return json({ reviews: [] }, 200);
  }

  // Serve from cache if fresh
  const now = Date.now();
  if (CACHE && now - CACHE.ts < TTL_MS) {
    return json(CACHE.payload, 200);
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'reviews,url');
  url.searchParams.set('key', apiKey);

  try {
    const r = await fetch(url.toString());
    if (!r.ok) {
      const empty = { reviews: [] };
      CACHE = { ts: now, payload: empty };
      return json(empty, 200);
    }
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
          source: 'google'
        }))
      : [];

    const payload = { reviews };
    CACHE = { ts: now, payload };
    return json(payload, 200);
  } catch {
    const empty = { reviews: [] };
    CACHE = { ts: now, payload: empty };
    return json(empty, 200);
  }
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN
    }
  });
}