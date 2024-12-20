import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // change build dest
  server: {
    watch: {
      usePolling: true
    }
  },
  build: {
    assetsDir: 'assets',
    assetsInlineLimit: 0,  // Disable inlining
    outDir: '../goofy_project/frontend',
  },
})