/// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // use global test APIs like 'describe' and 'it'
    environment: "jsdom", // simulate browser environment
    setupFiles: "./src/setupTests.js", // optional, for global setup
  },
});
