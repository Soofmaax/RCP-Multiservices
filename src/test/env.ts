export function withEnv(vars: Partial<ImportMetaEnv>, fn: () => void | Promise<void>) {
  const prev = globalThis.__APP_TEST_ENV__;
  globalThis.__APP_TEST_ENV__ = { ...(prev ?? {}), ...vars };
  try {
    const result = fn();
    return result;
  } finally {
    globalThis.__APP_TEST_ENV__ = prev;
  }
}

export function setEnv(vars: Partial<ImportMetaEnv>) {
  const prev = globalThis.__APP_TEST_ENV__;
  globalThis.__APP_TEST_ENV__ = { ...(prev ?? {}), ...vars };
  return () => {
    globalThis.__APP_TEST_ENV__ = prev;
  };
}