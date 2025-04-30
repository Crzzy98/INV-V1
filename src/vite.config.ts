import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'first-stencil': resolve(__dirname, '../node_modules/first-stencil'),
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
      allow: ['..', '../node_modules']
    }
  }
});
