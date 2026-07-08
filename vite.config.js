import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Icons live in your Supabase Storage "photos" bucket (public).
const ICON = 'https://esnbtfyauackpfzzwcmq.supabase.co/storage/v1/object/public/photos'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [],
      manifest: {
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
          { src: `${ICON}/icon-192.png`, sizes: '192x192', type: 'image/png' },
          { src: `${ICON}/icon-512.png`, sizes: '512x512', type: 'image/png' },
          {
            src: `${ICON}/icon-512-maskable.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
})
