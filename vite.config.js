import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path' 

export default defineConfig({

  // 写 import时可以省略文件后缀
  resolve: {
  extensions: ['.ts', '.js', '.vue', '.json'],
  alias: { 
      '@': path.resolve(__dirname, './src')
    }
  },

  plugins: [
    vue(),
    UnoCSS(),
  ],
})
