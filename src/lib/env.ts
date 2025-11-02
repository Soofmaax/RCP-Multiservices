declare global {
  // eslint-disable-next-line no-var
  var __APP_TEST_ENV__: Partial<ImportMetaEnv> | undefined;
}

type OptString = string | undefined;

function nonEmptyString(s: OptString): s is string {
  return typeof s === 'string' && s.trim().length > 0;
}

function pickEnv(override: OptString, env: OptString): string | undefined {
  if (nonEmptyString(override)) return override.trim();
  if (nonEmptyString(env)) return env.trim();
  return undefined;
}

export function getGbpUrl(): string | undefined {
  return pickEnv(globalThis.__APP_TEST_ENV__?.VITE_GBP_URL, import.meta.env.VITE_GBP_URL);
}

export function getReviewsEndpoint(): string | undefined {
  return pickEnv(globalThis.__APP_TEST_ENV__?.VITE_REVIEWS_ENDPOINT, import.meta.env.VITE_REVIEWS_ENDPOINT);
}

export function getGtagId(): string | undefined {
  return pickEnv(globalThis.__APP_TEST_ENV__?.VITE_GTAG_ID, import.meta.env.VITE_GTAG_ID);
}

export function getClarityId(): string | undefined {
  return pickEnv(globalThis.__APP_TEST_ENV__?.VITE_CLARITY_ID, import.meta.env.VITE_CLARITY_ID);
}