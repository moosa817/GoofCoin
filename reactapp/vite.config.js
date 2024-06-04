import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // change build dest
  build: {
    outDir: '../goofy_project/frontend',
  },
})
