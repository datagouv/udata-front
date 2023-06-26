import * as path from 'path';
import { mergeConfig } from 'vite';
import { withoutVitePlugins } from "@storybook/builder-vite";

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: [{
    directory: "../udata_front/theme/*/",
    files: "**/*.mdx"
  }, {
    directory: "../udata_front/theme/*/",
    files: "**/*.stories.@(js|jsx|ts|tsx)"
  }],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", {
    name: '@storybook/addon-styling'
  }, path.resolve('./.storybook/load-theme-preview-preset'), "@storybook/addon-mdx-gfm"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  viteFinal: async config => {
    config.plugins = await withoutVitePlugins(config.plugins, ["vite:legacy", "vite:legacy-config", "vite:legacy-generate-polyfill-chunk", "vite:legacy-post-process", "vite:legacy-polyfills"]);
    return mergeConfig(config, {
      build: {
        sourcemap: false,
        target: ['es2020']
      }
    });
  },
  docs: {
    autodocs: "tag"
  }
};
export default config;