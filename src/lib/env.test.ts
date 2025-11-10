import { describe, it, expect } from 'vitest';
import { withEnv } from '../test/env';
import { getGbpUrl, getReviewsEndpoint } from './env';

describe('env helpers', () => {
  it('getGbpUrl returns trimmed override when set', async () => {
    await withEnv({ VITE_GBP_URL: '  https://g.page/r/abc123  ' }, () => {
      expect(getGbpUrl()).toBe('https://g.page/r/abc123');
    });
  });

  it('getGbpUrl returns undefined when blank', async () => {
    await withEnv({ VITE_GBP_URL: '   ' }, () => {
      expect(getGbpUrl()).toBeUndefined();
    });
  });

  it('getGbpUrl returns undefined when not set', () => {
    expect(getGbpUrl()).toBeUndefined();
  });

  it('getReviewsEndpoint returns trimmed override when set', async () => {
    await withEnv({ VITE_REVIEWS_ENDPOINT: '  /api/reviews  ' }, () => {
      expect(getReviewsEndpoint()).toBe('/api/reviews');
    });
  });

  it('getReviewsEndpoint returns undefined when blank', async () => {
    await withEnv({ VITE_REVIEWS_ENDPOINT: '   ' }, () => {
      expect(getReviewsEndpoint()).toBeUndefined();
    });
  });

  it('getReviewsEndpoint returns undefined when not set', () => {
    expect(getReviewsEndpoint()).toBeUndefined();
  });
});