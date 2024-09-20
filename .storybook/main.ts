import * as path from 'path';
import { mergeConfig } from 'vite';
import { withoutVitePlugins } from "@storybook/builder-vite";
import type { StorybookConfig } from '@storybook/vue3-vite';
import { getTheme } from "../vite.config";
const theme = getTheme();

const config: StorybookConfig = {
  stories: [{
    directory: "../udata_front/theme/*/assets/",
    files: "**/*.mdx"
  }, {
    directory: "../udata_front/theme/*/assets/",
    files: "**/*.stories.@(js|jsx|ts|tsx)"
  }],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    '@storybook/addon-interactions',
    path.resolve('./.storybook/load-theme-preview-preset')
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  staticDirs: ['./msw', `../udata_front/theme/${theme}/templates/svg`],
  viteFinal: async config => {
    config.plugins = await withoutVitePlugins(config.plugins, ["vite:legacy", "vite:legacy-config", "vite:legacy-generate-polyfill-chunk", "vite:legacy-post-process", "vite:legacy-polyfills"]);
    return mergeConfig(config, {
      build: {
        sourcemap: false,
        target: ['es2020']
      }
    });
  },
  docs: {}
};
export default config;
