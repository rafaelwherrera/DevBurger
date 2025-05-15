import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/session': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      // se tiver outras rotas de API, pode adicionar mais aqui
    },
  },
})