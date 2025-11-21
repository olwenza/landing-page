import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',       // default is 'dist'
    rollupOptions: {
      input: '/index.html'
    }
  },
  base: './'               // ensures relative paths in S3
});
