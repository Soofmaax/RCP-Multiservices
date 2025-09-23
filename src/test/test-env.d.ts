import 'vite/client';

declare global {
  // eslint-disable-next-line no-var
  var __APP_TEST_ENV__: Partial<ImportMetaEnv> | undefined;
}

export {};