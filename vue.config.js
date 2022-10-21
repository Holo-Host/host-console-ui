const path = require('path')

const holoportUrl = process.env.VUE_APP_HOLOPORT_URL

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@uicommon': path.resolve(__dirname, 'ui-common-library/src'),
        '@': path.resolve(__dirname, 'src'),
        src: path.resolve(__dirname, 'src'),
        components: path.resolve(__dirname, 'src/components'),
        pages: path.resolve(__dirname, 'src/pages'),
        utils: path.resolve(__dirname, 'src/utils'),
        types: path.resolve(__dirname, 'src/types'),
        vue: path.resolve(__dirname, '/node_modules/vue')
      },
      fallback: {
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        fs: false
      }
    },
    experiments: {
      asyncWebAssembly: true
    }
  },
  devServer: holoportUrl && {
    proxy: {
      '/api/*': {
        target: holoportUrl
      },
      '/holochain-api/*': {
        target: holoportUrl
      }
    }
  }
}
