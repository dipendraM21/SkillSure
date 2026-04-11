/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  /** When `true`, {@link RequireRole} blocks admin/employer/candidate app routes without a matching session. */
  readonly VITE_ENFORCE_AUTH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
