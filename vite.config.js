import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    port:3000,
  },
  base: process.env.VITE_BASE_PATH || "/website-portfolio-deploy",
})
