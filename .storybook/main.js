const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-addon-mock/register",
    "@storybook/preset-scss"
  ],
  staticDirs: ['../public'],
  framework: "@storybook/vue3",
  core: {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve('../src'),
      src: resolve('../src'),
      components: resolve('../src/components'),
      pages: resolve('../src/pages'),
      utils: path.resolve('../src/utils'),
      types: path.resolve('../src/types')
    };

    return config;
  },
}
