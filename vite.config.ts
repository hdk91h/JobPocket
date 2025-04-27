import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/jobpocket/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // Aktiviert den Service Worker im Entwicklungsmodus
      },
      workbox: {
        // config workbox
        runtimeCaching: [
          {
            urlPattern: /^http:\/\/localhost:8080\./,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 1 Tag
              },
            },
          },
          {
            urlPattern:
              /\.(?:png|jpg|jpeg|svg|gif|webp|woff|woff2|eot|ttf|otf)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Tage
              },
            },
          },
        ],
      },
      manifest: {
        name: "JobPocket",
        short_name: "JobPocket",
        description: "Bewerben. Merken. Übersicht.",
        start_url: "/jobpocket/",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/jobpocket/assets/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/jobpocket/assets/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
