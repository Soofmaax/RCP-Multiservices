export function withEnv(vars: Partial<ImportMetaEnv>, fn: () => void) {
  const original = import.meta.env;
  const mutated: ImportMetaEnv = { ...original, ...vars };
  Object.defineProperty(import.meta, 'env', { value: mutated, configurable: true });
  try {
    fn();
  } finally {
    Object.defineProperty(import.meta, 'env', { value: original, configurable: true });
  }
}

export function setEnv(vars: Partial<ImportMetaEnv>) {
  const original = import.meta.env;
  const mutated: ImportMetaEnv = { ...original, ...vars };
  Object.defineProperty(import.meta, 'env', { value: mutated, configurable: true });
  return () => Object.defineProperty(import.meta, 'env', { value: original, configurable: true });
}