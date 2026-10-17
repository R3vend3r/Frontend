import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// НОВОЕ: при локальном "npm run dev" Vite сам перенаправляет "/api/..."
// на бэкенд, как это потом будет делать nginx внутри Docker.
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
