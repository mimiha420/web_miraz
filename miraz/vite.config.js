import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serwuje stronę pod https://mimiha420.github.io/web_miraz/
  // Lokalnie (npm run dev) zostaje "/".
  base: command === 'build' ? '/web_miraz/' : '/',
}))
