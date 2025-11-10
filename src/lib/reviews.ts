export type Review = {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number; // 1..5
  text?: string;
  source: 'google' | 'mock';
  authorUrl?: string;
};

type ApiReview = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text?: string;
  relative_time_description?: string;
  author_url?: string;
};

function isApiReview(x: unknown): x is ApiReview {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return typeof o.author_name === 'string' && typeof o.rating === 'number';
}

function isAppReview(x: unknown): x is Review {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return typeof o.authorName === 'string' && typeof o.rating === 'number';
}

function hasReviewsArray(x: unknown): x is { reviews: unknown[] } {
  return !!x && typeof x === 'object' && Array.isArray((x as { reviews?: unknown[] }).reviews);
}

function normalizeFromApi(arr: unknown[]): Review[] {
  return arr.filter(isApiReview).slice(0, 5).map((r) => ({
    authorName: r.author_name,
    authorPhotoUrl: typeof r.profile_photo_url === 'string' ? r.profile_photo_url : undefined,
    rating: typeof r.rating === 'number' ? r.rating : 0,
    text: typeof r.text === 'string' ? r.text : undefined,
    source: 'google',
    authorUrl: typeof r.author_url === 'string' ? r.author_url : undefined,
  }));
}

function normalizeFromApp(arr: unknown[]): Review[] {
  return arr.filter(isAppReview).slice(0, 5).map((r) => ({
    authorName: r.authorName,
    authorPhotoUrl: r.authorPhotoUrl,
    rating: r.rating,
    text: r.text,
    source: r.source,
    authorUrl: r.authorUrl,
  }));
}

export async function fetchReviews(): Promise<Review[]> {
  const env = import.meta.env;
  const endpoint =
    (typeof env.VITE_REVIEWS_ENDPOINT === 'string' && env.VITE_REVIEWS_ENDPOINT.trim().length > 0
      ? env.VITE_REVIEWS_ENDPOINT
      : undefined) ?? '/api/google-reviews';

  try {
    const res = await fetch(endpoint, { headers: { Accept: 'application/json' } });
    if (!res.ok) return [];
    const data: unknown = await res.json();

    if (Array.isArray(data)) {
      return normalizeFromApp(data);
    }
    if (hasReviewsArray(data)) {
      return normalizeFromApi(data.reviews);
    }
    return [];
  } catch {
    return [];
  }
}