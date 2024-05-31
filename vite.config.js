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
  server: {
    port: 6161,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@style': resolve(__dirname, 'src/style'),
      '@components': resolve(__dirname, 'src/components'),
      '@plugins': resolve(__dirname, 'src/plugins'),
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
      imports: [
        'vue',
        'vue-router',
        'quasar',
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
