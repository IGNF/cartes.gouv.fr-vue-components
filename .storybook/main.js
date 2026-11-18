export default {
  framework: {
    name: '@storybook/vue3-vite',
    options: { builder: { viteConfigPath: '.storybook/vite.config.js' } },
  },
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-vitest'],
  features: { experimentalDocgenServer: true },
  core: { disableTelemetry: true },
};
