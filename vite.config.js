import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handler as chatHandler } from './netlify/functions/chat.mjs'

/**
 * Dev-only middleware that runs the Netlify chat function in-process, so a plain
 * `npm run dev` gets the *real* AI — no separate `netlify functions:serve`
 * process and no fragile localhost:9999 proxy. In production Netlify serves the
 * same function directly, so this plugin is a no-op there (`apply: 'serve'`).
 */
function devChatFunction(env) {
  return {
    name: 'dev-chat-function',
    apply: 'serve',
    configureServer(server) {
      // The function reads the key from process.env (server-side only); mirror
      // the value loaded from .env so it's available in the dev process too.
      if (env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY

      server.middlewares.use('/.netlify/functions/chat', async (req, res) => {
        try {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const body = Buffer.concat(chunks).toString('utf8')

          const result = await chatHandler({
            httpMethod: req.method,
            headers: req.headers,
            body,
          })

          res.statusCode = result.statusCode || 200
          const headers = result.headers || { 'Content-Type': 'application/json' }
          for (const [key, value] of Object.entries(headers)) res.setHeader(key, value)
          res.end(result.body || '')
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Dev chat function error', detail: String(err) }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load every var from .env (loadEnv only exposes VITE_* to the client; here we
  // read the raw values so the dev function can see GEMINI_API_KEY server-side).
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), devChatFunction(env)],
  }
})
