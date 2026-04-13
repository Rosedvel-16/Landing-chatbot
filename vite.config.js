import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/landing-lead': {
        target: 'https://pruebasintercert.app.n8n.cloud',
        changeOrigin: true,
        secure: true,
        rewrite: () => '/webhook-test/landing-lead',
      },
    },
  },
})