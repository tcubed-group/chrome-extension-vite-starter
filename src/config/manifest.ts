/**
 * Typed MV3 manifest + entrypoint map — single source of truth for the extension.
 * Vite emits `build/manifest.json` from this module at build time.
 */

/** Minimal Manifest V3 shape used by this starter (extend as features land). */
export interface ManifestV3 {
  manifest_version: 3
  name: string
  version: string
  description?: string
  action?: {
    default_popup?: string
  }
  background?: {
    service_worker: string
    type?: 'module'
  }
  content_scripts?: Array<{
    matches: string[]
    js: string[]
    css?: string[]
    run_at?: 'document_start' | 'document_end' | 'document_idle'
  }>
  permissions?: string[]
  host_permissions?: string[]
}

/**
 * Entrypoint seams for each extension context.
 * `content` / `background` are reserved for future wiring — keep them listed so
 * permissions and build inputs stay discoverable in one place.
 */
export const entrypoints = {
  popup: {
    html: 'index.html',
    script: 'src/entrypoints/popup/main.tsx',
  },
  content: null as null,
  background: null as null,
} as const

export type Entrypoints = typeof entrypoints

export const manifest: ManifestV3 = {
  manifest_version: 3,
  name: 'Chrome Extension Vite Shadcn UI Starter',
  version: '0.0.0',
  description:
    'A modern, TypeScript-powered Chrome extension starter with React and Shadcn/UI',
  action: {
    default_popup: entrypoints.popup.html,
  },
  permissions: [],
}

export default manifest
