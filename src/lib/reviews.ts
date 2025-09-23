export type Review = {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number; // 1..5
  text?: string;
  source: 'google' | 'mock';
  url?: string;
};

export async function fetchReviews(): Promise<Review[]> {
  const env = import.meta.env;
  const endpoint =
    (typeof env.VITE_REVIEWS_ENDPOINT === 'string' && env.VITE_REVIEWS_ENDPOINT.trim().length > 0
      ? env.VITE_REVIEWS_ENDPOINT
      : undefined) ?? '/api/google-reviews';

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      return [];
    }
    const data: unknown = await res.json();
    if (Array.isArray(data)) {
      // data is Review[]
      return data.map((r) => ({
        authorName: r.authorName,
        authorPhotoUrl: r.authorPhotoUrl,
        rating: r.rating,
        text: r.text,
        source: (r as Review).source ?? 'google',
        url: r.url,
      }));
    }
    if (typeof data === 'object' && data !== null && Array.isArray((data as { reviews?: unknown }).reviews)) {
      const arr = (data as { reviews: Review[] }).reviews;
      return arr.map((r) => ({
        authorName: r.authorName,
        authorPhotoUrl: r.authorPhotoUrl,
        rating: r.rating,
        text: r.text,
        source: r.source ?? 'google',
        url: r.url,
      }));
    }
    return [];
  } catch {
    return [];
  }
}