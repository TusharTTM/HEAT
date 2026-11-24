import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Relative base for the production build so the same bundle works at the
  // domain root and under the GitHub Pages project path (/HEAT/).
  base: command === 'build' ? './' : '/',
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    // The app is opened through a proxied preview host (e.g. *.e2b.app),
    // which Vite blocks by default. Allow any host so the page can load.
    allowedHosts: true,
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: true,
  },
}))
