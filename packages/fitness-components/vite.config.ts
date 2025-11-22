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
      name: 'FitnessComponents',
      formats: ['es', 'umd'],
      fileName: format => `index.${format === 'es' ? 'esm' : format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@heroicons/react/20/solid',
        '@heroicons/react/24/outline',
        '@heroicons/react/24/solid',
        '@sudobility/components',
        '@sudobility/design',
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          '@heroicons/react/20/solid': 'HeroiconsSolid20',
          '@heroicons/react/24/outline': 'HeroiconsOutline',
          '@heroicons/react/24/solid': 'HeroiconsSolid',
          '@sudobility/components': 'SudobilityComponents',
          '@sudobility/design': 'SudobilityDesign',
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
