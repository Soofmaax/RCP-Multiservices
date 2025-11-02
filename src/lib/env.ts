declare global {
  // eslint-disable-next-line no-var
  var __APP_TEST_ENV__: Partial<ImportMetaEnv> | undefined;
}

function pickEnvString<K extends keyof ImportMetaEnv>(key: K): string | undefined {
  const testEnv = globalThis.__APP_TEST_ENV__;
  const overrideVal = testEnv?.[key];
  const envVal = import.meta.env[key];

  const raw =
    typeof overrideVal === 'string' && overrideVal.length > 0
      ? overrideVal
      : typeof envVal === 'string'
      ? envVal
      : undefined;

  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed.length ? trimmed : undefined;
}

export function getGbpUrl(): string | undefined {
  return pickEnvString('VITE_GBP_URL');
}

export function getReviewsEndpoint(): string | undefined {
  return pickEnvString('VITE_REVIEWS_ENDPOINT');
}

export function getGtagId(): string | undefined {
  return pickEnvString('VITE_GTAG_ID');
}

export function getClarityId(): string | undefined {
  return pickEnvString('VITE_CLARITY_ID');
}