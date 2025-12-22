import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { BASE_URL } from './src/common/constants.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: BASE_URL, // Change this to your backend server port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
