import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      'first-stencil': '/node_modules/first-stencil',
    }
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  optimizeDeps: {
    include: ['first-stencil']
  },
  server: {
    fs: {
      // Allow serving files from one level up from the package root
      allow: ['..']
    }
  }
});
