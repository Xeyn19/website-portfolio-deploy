/* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleGitHubContributions } from './api/github-contributions.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const githubContributionDevPlugin = {
    name: 'github-contributions-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/github-contributions', async (req, res) => {
        const origin = `http://${req.headers.host ?? 'localhost:3000'}`
        const request = new Request(new URL(req.url ?? '/api/github-contributions', origin), {
          method: req.method ?? 'GET',
          headers: req.headers,
        })

        try {
          const response = await handleGitHubContributions(request, env)
          res.statusCode = response.status

          response.headers.forEach((value, key) => {
            res.setHeader(key, value)
          })

          const body = await response.text()
          res.end(body)
        } catch (error) {
          res.statusCode = 500
          res.setHeader('content-type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              error:
                error instanceof Error
                  ? error.message
                  : 'GitHub contribution dev handler failed.',
            }),
          )
        }
      })
    },
  }

  return {
    plugins: [tailwindcss(), react(), githubContributionDevPlugin],
    server: {
      port: 3000,
    },
    base: mode === 'production'
      ? process.env.VITE_BASE_PATH || '/website-portfolio-deploy'
      : '/', 
  }
})
