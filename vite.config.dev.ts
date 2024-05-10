import { defineConfig, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import copy from 'rollup-plugin-copy';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { getTheme, getVersion } from "./vite.config";

async function getConfig(): Promise<UserConfig> {
  const theme = getTheme();
  let version = await getVersion(process.env.buildno);

  return {
    base: `/_themes/${theme}/`,
    plugins: [
      vue(),
      VueI18nPlugin({
        compositionOnly: false,
        /* options */
        include: resolve(dirname(fileURLToPath(import.meta.url)), `udata_front/theme/${theme}/assets/js/locales/**`),
      }),
      copy({
        targets: [
          { src: `udata_front/theme/${theme}/assets/img`, dest: `udata_front/theme/${theme}/static/` },
          { src: "node_modules/leaflet/dist/leaflet.js", dest: `udata_front/theme/${theme}/static/js/` },
          { src: "node_modules/leaflet/dist/leaflet.css", dest: `udata_front/theme/${theme}/static/js/` },
          {
            src: "node_modules/es-module-shims/dist/es-module-shims.js",
            dest: `udata_front/theme/${theme}/static/js/`,
            rename: `es-module-shims.${version}.js`,
          },
          {
            src: "node_modules/vue/dist/vue.esm-browser.js",
            dest: `udata_front/theme/${theme}/static/js/`,
            rename: `vue.esm-browser.prod.${version}.js`,
          },
          {
            src: "node_modules/vue-content-loader/dist/vue-content-loader.es.js",
            dest: `udata_front/theme/${theme}/static/js/`,
            rename: `vue-content-loader.es.${version}.js`,
          },
        ],
        hook: 'writeBundle'
      }),
    ],
    build: {
      minify: false,
      rollupOptions: {
        input: [
          `udata_front/theme/${theme}/assets/js/index.ts`,
          `udata_front/theme/${theme}/assets/js/admin.ts`,
          `udata_front/theme/${theme}/assets/less/style.less`,
        ],
        preserveEntrySignatures: 'exports-only',
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue', 'vue-content-loader'],
        output: {
          dir: `./udata_front/theme/${theme}/static/`,
          entryFileNames: `js/[name].${version}.js`,
          chunkFileNames: `js/[name].${version}.js`,
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
}

// https://vitejs.dev/config/
export default defineConfig(getConfig());
