import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  css: {
    // Ignore les media queries historiques réservées à Internet Explorer dans le DSFR.
    lightningcss: { errorRecovery: true },
  },
});
