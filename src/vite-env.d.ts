/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GBP_URL?: string;
  readonly VITE_REVIEWS_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}