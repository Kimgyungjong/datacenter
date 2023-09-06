import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://http://172.168.10.68:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: [
      { find: "@src", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
    ],
  },
  plugins: [react(), tsconfigPaths()],
});
