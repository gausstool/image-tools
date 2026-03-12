import vue from '@vitejs/plugin-vue';
import 'dotenv/config';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const AutoImport = (await import('unplugin-auto-import/vite')).default;
  const Components = (await import('unplugin-vue-components/vite')).default;
  const { ElementPlusResolver } = await import('unplugin-vue-components/resolvers');

  return {
    base: process.env.VITE_BASE_URL || '/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
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
        }
      }
    },
  };
});
