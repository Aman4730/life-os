import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev-only: forward serverless-function calls to a local functions server
    // (`netlify functions:serve`, default port 9999) so `npm run dev` gets the
    // real AI. Harmless in production (Netlify serves the function directly);
    // if no functions server is running, the chat gracefully falls back to the
    // built-in knowledge base.
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:9999',
        changeOrigin: true,
      },
    },
  },
})
