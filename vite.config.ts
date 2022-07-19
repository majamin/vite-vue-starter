import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
};

export default config;
