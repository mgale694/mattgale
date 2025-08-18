import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/', // Always use root path for Cloudflare Pages
  plugins: [
    tailwindcss(),
    tanstackRouter({}),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for Cloudflare Pages
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Better chunk splitting for caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          ui: ['lucide-react', 'class-variance-authority', 'clsx'],
        },
      },
    },
    // Enable source maps for better debugging
    sourcemap: false,
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dev server
  server: {
    open: false,
    host: true,
  },
  // Enable experimental features for better performance
  esbuild: {
    legalComments: 'none',
  },
});