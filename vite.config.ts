import react from '@vitejs/plugin-react';
import 'dotenv/config';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [react()],
  server: {
    port: 2001,
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  build: {
    outDir: process.env.VITE_BUILD_DIR || 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react';
            }
          }
        }
      }
    }
  },
});
