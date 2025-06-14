import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/trpc': 'http://localhost:3001'
    }
  },
  optimizeDeps: {
    include: ['vue', '@trpc/client']
  }
});
