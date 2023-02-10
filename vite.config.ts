import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import { configDefaults } from 'vitest/config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const envVariables = {
    VITE_HOLOPORT_URL: env.VITE_HOLOPORT_URL,
    VITE_HPOS_PORT: env.VITE_HPOS_PORT,
    VITE_UI_VERSION: env.VITE_UI_VERSION
  }

  console.log(envVariables)

  return {
    resolve: {
      alias: {
        '@': resolve(dirname(fileURLToPath(import.meta.url)), './src'),
        '@uicommon': resolve(dirname(fileURLToPath(import.meta.url)), './ui-common-library/src'),
        buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6'
      },
      extensions: ['.js', '.ts', '.vue', '.json']
    },
    plugins: [
      wasm(),
      topLevelAwait(),
      vue(),
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**')
      })
    ],
    optimizeDeps: {
      exclude: ['@syntect/wasm']
    },
    server:
      env.NODE_ENV === 'production' || env.NODE_ENV === 'test'
        ? {}
        : env.VITE_HOLOPORT_URL && {
          port: 8080,
          proxy: {
            '^/api/*': {
              target: env.VITE_HOLOPORT_URL,
              changeOrigin: true
              },
            '^/holochain-api/*': {
              target: env.VITE_HOLOPORT_URL,
              changeOrigin: true
              }
          }
        },
    test: {
      environment: 'happy-dom',
      exclude: [...configDefaults.exclude, '**/ui-common-library/**']
    }
  }
})
