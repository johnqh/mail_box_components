import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'EntityComponents',
      formats: ['es', 'umd'],
      fileName: format => `index.${format === 'es' ? 'esm' : format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@sudobility/components',
        '@sudobility/design',
        '@sudobility/types',
        '@heroicons/react/24/outline',
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          '@sudobility/components': 'SudobilityComponents',
          '@sudobility/design': 'SudobilityDesign',
          '@sudobility/types': 'SudobilityTypes',
          '@heroicons/react/24/outline': 'HeroiconsOutline',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
