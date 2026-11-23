import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Strona działa pod własną domeną (psychologiamiraz.pl) w katalogu głównym.
  base: '/',
}))
