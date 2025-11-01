import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Base URL for GitHub Pages deployment
  // Change 'horse-racing-game' to your repository name
  base: process.env.NODE_ENV === "production" ? "/horse-racing-game/" : "/",

  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.png'],
      manifest: {
        name: 'Horse Racing Game',
        icons: [
          { src: 'icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  // Service Worker configuration
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
      },
    },
  },
});
