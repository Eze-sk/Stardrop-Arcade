import { defineConfig } from "vite"

export default defineConfig({
  base: './',
  build: {
    outDir: "../web/public/video-games/journey-of-the-prairie-king.dist",
    emptyOutDir: true,
  }
})