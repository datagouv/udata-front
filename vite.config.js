import { resolve } from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/_themes/gouvfr/",
  resolve: {
    alias: [
      {find: "svg", replacement: "./udata_front/theme/gouvfr/templates/svg"},
      {find: "vue", replacement: "./node_modules/vue/dist/vue.esm-bundler.js"},
    ],
  },
  plugins: [
    vue(),
  ],
  build: {
    target: "es2015",
    rollupOptions: {
      input: ["theme/js/index.js", "theme/less/style.less"],
      output: {
        dir: "./udata_front/theme/gouvfr/static/",
        entryFileNames: `js/[name].js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        manualChunks: {
          vue: ['vue']
        }
      }
    }
  }
});
