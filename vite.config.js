import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  return {
    plugins: [tailwindcss(), react()],
    server: {
      port: 3000,
    },
    base: mode === 'production'
      ? process.env.VITE_BASE_PATH || '/website-portfolio-deploy'
      : '/', 
  }
})
