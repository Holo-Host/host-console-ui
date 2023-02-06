const path = require('path-browserify')
const webpack = require('webpack')

const holoportUrl = import.meta.env.VITE_HOLOPORT_URL

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
      extensions: ['.js', '.ts', '.vue', '.json'],
      fallback: {
        buffer: require.resolve('buffer/'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        fs: false
      }
    },
    experiments: {
      asyncWebAssembly: true
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      })
    ]
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
