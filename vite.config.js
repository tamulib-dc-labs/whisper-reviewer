import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: './index.html', // Ensure this points to your actual index.html
    }
  }
});