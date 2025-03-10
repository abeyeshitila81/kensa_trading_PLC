import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], server: {
    proxy: {
      '/api': {
        target: 'https://api.cloudinary.com/v1_1/djqmtxpds', // Your Cloudinary API base URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },


})
