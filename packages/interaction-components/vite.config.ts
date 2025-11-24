import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['**/*.test.tsx', '**/*.test.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'interaction-components',
      formats: ['es', 'umd'],
      fileName: format => `index.${format === 'es' ? 'esm' : 'umd'}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@sudobility/components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@sudobility/components': 'SudobilityComponents',
        },
      },
    },
    sourcemap: true,
  },
});
