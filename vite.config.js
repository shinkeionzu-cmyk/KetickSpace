import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Tempat index.html asal kau
  build: {
    outDir: '../dist', // Hasil siap dihantar keluar ke folder dist
    emptyOutDir: true,
  }
});
