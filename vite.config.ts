import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { entrypoints, manifest } from './src/config/manifest.ts'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/** Emit typed MV3 manifest.json into the build output (replaces broken public/ copy). */
function emitManifest(): Plugin {
  return {
    name: 'emit-extension-manifest',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: `${JSON.stringify(manifest, null, 2)}\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), emitManifest()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: `./${entrypoints.popup.html}`,
      },
    },
  },
})
