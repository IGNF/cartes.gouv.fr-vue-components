import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import pkg from './package.json';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(process.cwd(), 'src/index.js'),
      name: 'CartesGouvFrVueComponents',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.peerDependencies || {}),
        /^@codemirror\//,
      ],
    },
  },
});
