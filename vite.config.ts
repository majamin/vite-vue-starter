import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
};

export default config;
