import * as path from 'path';

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: [{
    directory: "../udata_front/theme/*/",
    files: "**/*.mdx",
  }, {
    directory: "../udata_front/theme/*/",
    files: "**/*.stories.@(js|jsx|ts|tsx)",
  }],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-styling',
    },
    path.resolve('./.storybook/load-theme-preview-preset')
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
