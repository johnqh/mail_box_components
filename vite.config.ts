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
      name: 'MailBoxComponents',
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
        '@radix-ui/react-alert-dialog',
        '@radix-ui/react-dialog',
        '@radix-ui/react-label',
        '@radix-ui/react-select',
        '@radix-ui/react-switch',
        '@radix-ui/react-tabs',
        'clsx',
        'tailwind-merge',
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          clsx: 'clsx',
          'tailwind-merge': 'tailwindMerge',
          '@heroicons/react/24/outline': 'HeroiconsOutline',
          '@heroicons/react/24/solid': 'HeroiconsSolid',
          '@radix-ui/react-label': 'RadixLabel',
          '@radix-ui/react-select': 'RadixSelect',
          '@radix-ui/react-switch': 'RadixSwitch',
          '@radix-ui/react-tabs': 'RadixTabs',
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
