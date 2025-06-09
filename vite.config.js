import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
    server: {
    host: true, // Equivalente a '0.0.0.0'
    port: 5173,
  },
})
