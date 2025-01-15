import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(config => {
  const { VITE_ONLY_LOCALES } = loadEnv(config.mode, process.cwd());
  return {
    plugins: [
      vue(),
      VueI18nPlugin({
        compositionOnly: true,
        include: resolve(__dirname, './src/locales/**/*.json'),
        onlyLocales: VITE_ONLY_LOCALES.split(","),
      }),
      dts({
        copyDtsFiles: true,
        staticImport: true,
        insertTypesEntry: true,
        compilerOptions: {
          declarationMap: true
        }
      }),
    ],
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'DataGouvFrComponents',
        // the proper extensions will be added
        fileName: 'data-gouv-fr-components',
        formats: ['es']
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['@headlessui/vue', 'axios', 'chart.js', 'remark', 'remark-gfm', 'strip-markdown', 'swagger-themes', 'swagger-ui', 'vue', 'vue-router'],
        output: {
          chunkFileNames: "chunks/[name]-[hash].js",
        },
      },
      sourcemap: true,
    },
    optimizeDeps: {
      exclude: ["oh-vue-icons/icons"]
    }
  };
});
