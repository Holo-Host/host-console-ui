import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import wasm from "vite-plugin-wasm";
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: {
        '@': resolve(dirname(fileURLToPath(import.meta.url)), './src'),
        '@uicommon': resolve(dirname(fileURLToPath(import.meta.url)), './ui-common-library/src')
        // 'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
      },
      extensions: ['.js', '.ts', '.vue', '.json']
    },
    plugins: [
      wasm(),
      topLevelAwait(),
      vue(),
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
      })
    ],
    server: env.VITE_HOLOPORT_URL && {
      proxy: {
        '/api/*': {
          target: env.VITE_HOLOPORT_URL,
          changeOrigin: true
        },
        '/holochain-api/*': {
          target: env.VITE_HOLOPORT_URL,
          changeOrigin: true
        }
      }
    },
    optimizeDeps: {
      exclude: [
        "@syntect/wasm"
      ]
    }
  }
})
