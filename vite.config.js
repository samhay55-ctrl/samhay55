import { readFileSync, existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const ICON_FILES = [
  'icon-192.png',
  'icon-512.png',
  'icon-512-maskable.png',
  'apple-touch-180.png',
]

// Copy the icon PNGs (which live at the repo root) into the build output so
// they're served from the app's own domain — same origin as the manifest.
function copyRootIcons() {
  return {
    name: 'copy-root-icons',
    generateBundle() {
      for (const f of ICON_FILES) {
        if (existsSync(f)) {
          this.emitFile({ type: 'asset', fileName: f, source: readFileSync(f) })
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyRootIcons(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [],
      manifest: {
        id: '/',
        name: 'Livingway',
        short_name: 'Livingway',
        description: 'A quiet place to move, breathe and gather.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#F3EEE6',
        theme_color: '#2B2825',
        categories: ['health', 'lifestyle'],
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          {
            src: '/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2,png}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
})
