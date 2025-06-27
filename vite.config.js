import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Base public path when served in development or production
  base: '/',
  root: 'test-pages',

  // Resolve aliases for easier imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      jupiter: resolve(__dirname, 'src/index.js'),
    },
  },

  // Configure server options
  server: {
    port: 8448,
    open: false, // Don't open browser automatically
    cors: true,
  },

  // Build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Handling for library mode
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Jupiter',
      fileName: format => `jupiter.${format}.js`,
    },
    // Roll-up specific options
    rollupOptions: {
      // Make sure external dependencies aren't bundled
      external: ['gsap'],
      output: {
        // Global variable name to use in UMD builds
        globals: {
          gsap: 'gsap',
        },
      },
    },
  },
})
