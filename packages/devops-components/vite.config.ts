import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), dts({ include: ['src'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Components',
      formats: ['es', 'umd'],
      fileName: format => `index.${format === 'es' ? 'esm' : 'umd'}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@sudobility/components',
        '@sudobility/design',
        '@radix-ui/react-tooltip',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
