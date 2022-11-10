import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    build: {
        target: "es2015",
        rollupOptions: {
            input: "theme/js/index.js",
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                //entryFileNames: `assets/[name].js`,
                //chunkFileNames: `assets/[name].js`,
                //assetFileNames: `assets/[name].[ext]`,
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
});
