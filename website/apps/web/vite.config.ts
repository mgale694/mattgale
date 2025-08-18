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
    // Optimize for Cloudflare Pages and SEO
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Better chunk splitting for caching and SEO performance
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          ui: ['lucide-react', 'class-variance-authority', 'clsx'],
          markdown: ['react-markdown', 'remark-gfm', 'rehype-highlight'],
        },
        // Ensure consistent file names for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name || '')) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Enable source maps for better debugging (disable in production)
    sourcemap: false,
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Additional optimizations for SEO and performance
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline small assets for fewer HTTP requests
  },
  // Optimize dev server
  server: {
    open: false,
    host: true,
  },
  // Enable experimental features for better performance
  esbuild: {
    legalComments: 'none',
    // Remove console.log in production for better performance
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
});