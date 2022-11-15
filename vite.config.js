import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/_themes/gouvfr/",
  resolve: {
    alias: [
      {find: "svg", replacement: "./udata_front/theme/gouvfr/templates/svg"},
    ],
  },
  plugins: [
    vue(),
    legacy({
      targets: "> 0.1%, last 15 versions, Firefox ESR, not dead",
      externalSystemJS: true,
    }),
    copy({
      targets: [
        { src: 'theme/img', dest: 'udata_front/theme/gouvfr/static/' },
        { src: "node_modules/systemjs/dist/s.min.js", dest: 'udata_front/theme/gouvfr/static/js/' },
      ],
      hook: 'writeBundle'
    }),
  ],
  build: {
    rollupOptions: {
      input: [
        "theme/js/index.js",
        "theme/less/style.less",
        "node_modules/es-module-shims/dist/es-module-shims.js",
        "node_modules/vue/dist/vue.esm-browser.prod.js",
      ],
      preserveEntrySignatures: 'exports-only',
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        dir: "./udata_front/theme/gouvfr/static/",
        entryFileNames: `js/[name].js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
