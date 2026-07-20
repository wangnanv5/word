import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({

  // 写 import时可以省略文件后缀
  resolve: {
  extensions: ['.ts', '.js', '.vue', '.json'],
  alias: { 
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  plugins: [
    vue(),
    UnoCSS(),
  ],
})
