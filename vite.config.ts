import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/webui/',
  // alias
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dirs: ['./src/hooks'],
      dts: './src/auto-imports.d.ts',
      vueTemplate: true,
    }),
    Icons({
      autoInstall: true,
    }),
    UnoCSS(),
  ],
})
