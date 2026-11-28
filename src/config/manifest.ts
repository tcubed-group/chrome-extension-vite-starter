/**
 * Typed MV3 manifest + entrypoint map — single source of truth for the extension.
 * Vite emits `build/manifest.json` from this module at build time.
 */

import pkg from '../../package.json' with { type: 'json' }

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

/** Popup HTML + module entry used by Vite / `action.default_popup`. */
export type PopupEntrypoint = {
  html: string
  script: string
}

/**
 * Future content-script seam — register in `manifest.content_scripts` and add a
 * Vite multi-page / lib input when wiring (matches + js bundle path).
 */
export type ContentEntrypoint = {
  matches: string[]
  script: string
} | null

/**
 * Future background service-worker seam — set `manifest.background.service_worker`
 * and add the script as a Vite build input when wiring.
 */
export type BackgroundEntrypoint = {
  script: string
} | null

/**
 * Entrypoint seams for each extension context.
 * `content` / `background` stay null until those contexts are added; document the
 * shape here so Vite + manifest wiring stay discoverable in one module.
 */
export const entrypoints = {
  popup: {
    html: 'index.html',
    script: 'src/entrypoints/popup/main.tsx',
  } satisfies PopupEntrypoint,
  content: null as ContentEntrypoint,
  background: null as BackgroundEntrypoint,
}

export type Entrypoints = typeof entrypoints

export const manifest: ManifestV3 = {
  manifest_version: 3,
  name: 'Chrome Extension Vite Shadcn UI Starter',
  version: pkg.version,
  description: pkg.description,
  action: {
    default_popup: entrypoints.popup.html,
  },
  permissions: [],
}

export default manifest
