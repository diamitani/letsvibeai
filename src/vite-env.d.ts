/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional form endpoint (e.g. Formspree) for the contact form. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
