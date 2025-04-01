// frontend/vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente com base no modo (development/production)
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true, // Permite acesso externo em modo de desenvolvimento
      strictPort: true, // Falha se a porta não estiver disponível
      proxy: {
        '/api': {
          target: env.BACKEND_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      },
      watch: {
        usePolling: true, // Melhora a detecção de alterações em alguns sistemas
      },
      cors: true // Habilita CORS para desenvolvimento
    },
    preview: {
      port: 3000,
      host: true,
      strictPort: true,
    },
    build: {
      outDir: '../dist',
      assetsDir: 'assets',
      emptyOutDir: true, 
      sourcemap: mode === 'development', // Só gera sourcemaps em desenvolvimento
      minify: mode === 'production' ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: mode === 'production'
        }
      },
      assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.webp', '**/*.gif']
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@containers': path.resolve(__dirname, './src/containers'),
        '@contexts': path.resolve(__dirname, './src/contexts')
      }
    },
    // Melhora feedback durante o desenvolvimento
    logLevel: 'info',
    clearScreen: false,
    // Adiciona suporte a HMR (Hot Module Replacement)
    hmr: {
      overlay: true,
    },
  }
})