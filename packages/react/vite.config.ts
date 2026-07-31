import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const src = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@\/components\/ui\//, replacement: `${src('./src/ui/components')}/` },
      { find: /^@\/components\//, replacement: `${src('./src/ui')}/` },
      { find: /^@\//, replacement: `${src('./src')}/` },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
});
