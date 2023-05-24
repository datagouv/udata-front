import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import copy from 'rollup-plugin-copy';
import legacy from '@vitejs/plugin-legacy';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import projectInformation from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  let theme = "gouvfr";

  const themeInfoFiles = await glob('udata_front/theme/*/info.json');

  if(themeInfoFiles.length === 0) {
    throw new Error("at least one udata_front theme must be installed.");
  }

  if(themeInfoFiles.length === 1) {
    const file = themeInfoFiles[0];
    /** @type {Record<string, string>} */
    const info = require(`./${file}`);
    theme = info.identifier;
  }

  return {
    base: `/_themes/${theme}/`,
    resolve: {
      alias: [
        {find: "svg", replacement: `./udata_front/theme/${theme}/templates/svg`},
      ],
    },
    plugins: [
      vue(),
      VueI18nPlugin({
        compositionOnly: false,
        /* options */
        include: resolve(dirname(fileURLToPath(import.meta.url)), `udata_front/theme/${theme}/assets/js/locales/**`),
      }),
      legacy({
        targets: "> 0.1%, last 15 versions, Firefox ESR, not dead",
        externalSystemJS: true,
      }),
      copy({
        targets: [
          { src: `udata_front/theme/${theme}/assets/img`, dest: `udata_front/theme/${theme}/static/` },
          { src: "node_modules/systemjs/dist/s.min.js", dest: `udata_front/theme/${theme}/static/js/` },
        ],
        hook: 'writeBundle'
      }),
    ],
    build: {
      rollupOptions: {
        input: [
          `udata_front/theme/${theme}/assets/js/index.js`,
          `udata_front/theme/${theme}/assets/less/style.less`,
          "node_modules/es-module-shims/dist/es-module-shims.js",
          "node_modules/vue/dist/vue.esm-browser.prod.js",
          "node_modules/vue-content-loader/dist/vue-content-loader.es.js",
        ],
        preserveEntrySignatures: 'exports-only',
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue', 'vue-content-loader'],
        output: {
          dir: `./udata_front/theme/${theme}/static/`,
          entryFileNames: `js/[name].js`,
          chunkFileNames: `js/[name].${projectInformation.version}.js`,
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
  };
});
