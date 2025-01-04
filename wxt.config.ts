import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  outDir: "dist",
  vite: () => ({
    plugins: [TanStackRouterVite()],
  }),
});
