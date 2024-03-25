import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
// https://vitest.dev/config/
export default defineConfig({
  plugins: [
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
      name: 'UdataFrontPluginsHelper',
      // the proper extensions will be added
      fileName: 'udata-front-plugins-helper',
    },
  },
  test: {
    environment: "jsdom",
    clearMocks: true,
  }
});
