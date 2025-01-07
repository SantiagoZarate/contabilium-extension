import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'wxt';
import { resolve } from 'node:path'

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  outDir: 'dist',
  vite: () => ({
    plugins: [TanStackRouterVite()],
  }),
  alias: {
    strings: resolve(__dirname, '../../packages/contabilium-api'),
  }
});
