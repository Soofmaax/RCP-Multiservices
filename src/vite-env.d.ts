/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GBP_URL?: string;
  readonly VITE_REVIEWS_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/* Asset module declarations to satisfy TypeScript and ESLint */
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}