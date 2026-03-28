import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Beritahu Vite index.html ada kat sini
  build: {
    outDir: '../dist', // Hasil siap akan masuk folder dist kat luar
    emptyOutDir: true,
  }
});
