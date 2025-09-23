export async function withEnv<T>(
  vars: Partial<ImportMetaEnv>,
  fn: () => T | Promise<T>,
): Promise<T> {
  const prev = globalThis.__APP_TEST_ENV__;
  globalThis.__APP_TEST_ENV__ = { ...(prev ?? {}), ...vars };
  try {
    return await fn();
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