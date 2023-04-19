import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import legacy from '@vitejs/plugin-legacy'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'


function get_package_version(){
  var pjson = require('./package.json');
  return pjson.version
}

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
    VueI18nPlugin({
      compositionOnly: false,
      /* options */
      include: resolve(dirname(fileURLToPath(import.meta.url)), 'theme/js/locales/**'),
    }),
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
        "node_modules/vue-content-loader/dist/vue-content-loader.es.js",
      ],
      preserveEntrySignatures: 'exports-only',
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'vue-content-loader'],
      output: {
        dir: "./udata_front/theme/gouvfr/static/",
        entryFileNames: `js/[name].js`,
        chunkFileNames: `js/[name].${get_package_version()}.js`,
        assetFileNames: `assets/[name].[ext]`,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          "vue-content-loader": "ContentLoader"
        }
      }
    }
  }
});
