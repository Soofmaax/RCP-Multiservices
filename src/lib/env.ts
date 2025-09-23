import 'vite/client';

declare global {
  // eslint-disable-next-line no-var
  var __APP_TEST_ENV__: Partial<ImportMetaEnv> | undefined;
}

export function getGbpUrl(): string | undefined {
  const override = globalThis.__APP_TEST_ENV__?.VITE_GBP_URL;
  const raw =
    typeof override === 'string' && override.length > 0
      ? override
      : import.meta.env.VITE_GBP_URL;

  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed.length ? trimmed : undefined;
}

export function getReviewsEndpoint(): string | undefined {
  const override = globalThis.__APP_TEST_ENV__?.VITE_REVIEWS_ENDPOINT;
  const raw =
    typeof override === 'string' && override.length > 0
      ? override
      : import.meta.env.VITE_REVIEWS_ENDPOINT;

  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed.length ? trimmed : undefined;
}