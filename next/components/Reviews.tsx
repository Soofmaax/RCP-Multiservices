'use client';

import { useEffect, useState } from 'react';

type Review = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text?: string;
  author_url?: string;
  time?: number;
  source?: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/google-reviews', { cache: 'no-store' });
        const data = await res.json();
        if (mounted) setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch {
        if (mounted) setReviews([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (reviews === null) {
    return (
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Avis clients</h2>
        <p className="text-gray-600 mt-2">Chargement des avis…</p>
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Avis clients</h2>
        <p className="text-gray-600 mt-2">Pas encore d&apos;avis — soyez le premier.</p>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold">Avis clients</h2>
      <ul className="mt-3 space-y-3">
        {reviews.slice(0, 5).map((r, idx) => (
          <li key={idx} className="rounded border p-3 bg-white shadow-sm">
            <div className="flex items-center gap-2">
              {r.profile_photo_url ? (
                <img
                  src={r.profile_photo_url}
                  alt={r.author_name}
                  className="w-8 h-8 rounded-full object-cover"
                  loading="lazy"
                />
              ) : null}
              <div className="flex-1">
                <div className="font-medium">
                  {r.author_url ? (
                    <a href={r.author_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                      {r.author_name}
                    </a>
                  ) : (
                    r.author_name
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {renderStars(r.rating)} {r.relative_time_description ?? ''}
                </div>
              </div>
            </div>
            {r.text ? <p className="mt-2 text-gray-800">{r.text}</p> : null}
            <div className="mt-2 text-xs text-gray-500">
              Source: {r.source === 'google' ? 'Google' : 'Avis'}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function renderStars(rating: number) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}