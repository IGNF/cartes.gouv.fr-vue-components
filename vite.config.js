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
      // Keep the extracted stylesheet name aligned with the import added below.
      cssFileName: 'index',
    },
    rolldownOptions: {
      external: [...Object.keys(pkg.peerDependencies || {})],
      output: {
        // Vite extracts library CSS into a separate file; importing it here makes
        // the package's root JavaScript entry load its styles for consuming apps.
        banner: "import './index.css';",
      },
    },
  },
});
