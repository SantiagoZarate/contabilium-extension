import { resolve } from 'path';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  outDir: 'dist',
  vite: () => ({
    envDir: resolve(__dirname, '../../'),
  }),
  manifest: {
    permissions: ['storage'],
  },
});
