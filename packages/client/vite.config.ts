// packages/client/vite.config.ts
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: true, // Expose sur toutes les interfaces
    proxy: {
      '/trpc': 'http://localhost:3001'
    }
  },
  optimizeDeps: {
    include: ['vue', '@trpc/client']
  }
});
