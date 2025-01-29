import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    // Specify the output directory (relative to project root)
    outDir: '../backend/dist',
    // Clean the output directory before build
    emptyOutDir: true,
    // Disable source maps for production
    sourcemap: false,
    rollupOptions: {
      output: {
        // Ensure proper module format
        format: 'es',
        // Customize chunk naming
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    // Development server settings
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    // Ensure proper module resolution
    alias: {
      '@': '/src'
    }
  }
})