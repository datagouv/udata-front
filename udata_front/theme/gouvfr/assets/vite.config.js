import { resolve } from 'path';
import { defineConfig } from 'vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {find: "svg", replacement: `../templates/svg`},
    ],
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      compositionOnly: true,
      include: resolve(__dirname, './src/locales/**'),
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.js'),
      name: 'DataGouvFrComponents',
      // the proper extensions will be added
      fileName: 'data-gouv-fr-components',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
