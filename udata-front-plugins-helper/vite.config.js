import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// https://vitest.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  test: {
    environment: "jsdom",
    clearMocks: true,
    typecheck: {
      checker: "vue-tsc"
    }
  }
});
