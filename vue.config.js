const path = require('path')

const holoportUrl = process.env.VUE_APP_HOLOPORT_URL

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
        components: path.resolve(__dirname, 'src/components'),
        pages: path.resolve(__dirname, 'src/pages'),
      }
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
    },
  },
}
