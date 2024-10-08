import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';
import lodash from 'lodash';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { QuasarResolver } from 'unplugin-vue-components/resolvers';
import components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/data-driven-form-vue/',
  server: {
    port: 6161,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@style': resolve(__dirname, 'src/style'),
      '@components': resolve(__dirname, 'src/components'),
      '@plugins': resolve(__dirname, 'src/plugins'),
      '@libs': resolve(__dirname, 'src/libs'),
      '@store': resolve(__dirname, 'src/store'),
      '@router': resolve(__dirname, 'src/router'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@composables': resolve(__dirname, 'src/composables'),
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    eslint({
      fix: true,
    }),
    components({
      resolvers: [QuasarResolver()],
    }),
    AutoImport({
      vueTemplate: true,
      defaultExportByFilename: true,
      imports: [
        'vue',
        'vue-router',
        'quasar',
        'pinia',
        {
          from: '@libs/Collection.js',
          imports: ['Collection'],
        },
        {
          from: '@libs/Form.js',
          imports: ['Form'],
        },
        {
          from: '@store/index.js',
          imports: ['useOperationStore'],
        },
        {
          'plotly.js-dist': [['default', 'Plotly']],
        },
        {
          from: 'lodash',
          imports: lodash.keys(
            lodash.fromPairs(
              lodash.toPairs(lodash).filter(([key, value]) => typeof value == 'function'),
            ),
          ),
        },
      ],
      eslintrc: {
        enabled: true,
      },
    }),

    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      autoImportComponentCase: 'pascal',
      sassVariables: 'src/style/abstracts/_quasar-variables.scss',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@style/abstracts/index.scss";`,
      },
    },
  },
});
