export type Review = {
  author_name: string;
  profile_photo_url?: string;
  rating: number; // 1..5
  relative_time_description?: string;
  text?: string;
  time?: number;
  author_url?: string;
  source?: 'google' | 'mock';
};

export async function fetchReviews(): Promise<Review[]> {
  const endpoint =
    import.meta.env.VITE_REVIEWS_ENDPOINT && String(import.meta.env.VITE_REVIEWS_ENDPOINT).trim().length > 0
      ? String(import.meta.env.VITE_REVIEWS_ENDPOINT)
      : '/api/google-reviews';

  try {
    const res = await fetch(endpoint, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    // Expecting { reviews: Review[] }
    if (data && Array.isArray(data.reviews)) {
      return data.reviews as Review[];
    }
    return [];
  } catch {
    return [];
  }
}