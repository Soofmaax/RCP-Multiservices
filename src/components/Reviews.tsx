import { useEffect, useState } from 'react';
import { fetchReviews, type Review } from '../lib/reviews';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    void (async () => {
      const items = await fetchReviews();
      setReviews(items);
    })();
  }, []);

  if (reviews === null) {
    return (
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Avis clients</h2>
        <p className="text-neutral-600 mt-2">Chargement des avis…</p>
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Avis clients</h2>
        <p className="text-neutral-600 mt-2">Pas encore d&apos;avis — soyez le premier.</p>
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
              {r.authorPhotoUrl ? (
                <img
                  src={r.authorPhotoUrl}
                  alt={r.authorName}
                  className="w-8 h-8 rounded-full object-cover"
                  loading="lazy"
                />
              ) : null}
              <div className="flex-1">
                <div className="font-medium">{r.authorName}</div>
                <div className="text-sm text-neutral-400">{renderStars(r.rating)}</div>
              </div>
            </div>
            {r.text ? <p className="mt-2 text-neutral-900">{r.text}</p> : null}
            <div className="mt-2 text-xs text-neutral-400">Source: {r.source === 'google' ? 'Google' : 'Avis'}</div>
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