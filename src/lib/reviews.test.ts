import { describe, it, expect, afterEach } from 'vitest';
import { fetchReviews } from './reviews';

afterEach(() => {
  vi.restoreAllMocks();
});

function mockFetch(json: unknown, ok = true) {
  return vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue({
      ok,
      json: () => Promise.resolve(json),
    } as unknown as Response);
}

describe('fetchReviews', () => {
  it('uses default endpoint and returns normalized google reviews when API shape', async () => {
    const reviewsApi = {
      reviews: [
        {
          author_name: 'Alice',
          profile_photo_url: 'https://example.com/a.jpg',
          rating: 5,
          text: 'Super service',
          author_url: 'https://maps.google.com/alice',
        },
        // invalid item should be filtered out
        { foo: 'bar' },
      ],
    };

    const spy = mockFetch(reviewsApi);
    const items = await fetchReviews();

    expect(spy).toHaveBeenCalledWith(
      '/api/google-reviews',
      expect.objectContaining({ headers: { Accept: 'application/json' } }),
    );
    expect(items.length).toBe(1);
    expect(items[0]).toMatchObject({
      authorName: 'Alice',
      authorPhotoUrl: 'https://example.com/a.jpg',
      rating: 5,
      text: 'Super service',
      source: 'google',
      authorUrl: 'https://maps.google.com/alice',
    });
  });

  it('returns normalized app reviews when array shape', async () => {
    mockFetch([
      {
        authorName: 'Bob',
        authorPhotoUrl: 'https://example.com/b.jpg',
        rating: 4,
        text: 'Très bien',
        source: 'mock',
        authorUrl: 'https://example.com/bob',
      },
      // invalid item should be filtered out
      { baz: 'qux' },
    ]);

    const items = await fetchReviews();
    expect(items.length).toBe(1);
    expect(items[0]).toMatchObject({
      authorName: 'Bob',
      authorPhotoUrl: 'https://example.com/b.jpg',
      rating: 4,
      text: 'Très bien',
      source: 'mock',
      authorUrl: 'https://example.com/bob',
    });
  });

  it('returns empty array on non-ok response', async () => {
    mockFetch({ reviews: [] }, false);
    const items = await fetchReviews();
    expect(items).toEqual([]);
  });

  it('returns empty array on invalid shape', async () => {
    mockFetch({ foo: 'bar' }, true);
    const items = await fetchReviews();
    expect(items).toEqual([]);
  });
});