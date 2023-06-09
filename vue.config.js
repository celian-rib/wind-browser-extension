const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.ts',
      title: 'Popup'
    }
  },

  pluginOptions: {
    browserExtension: {
      componentOptions: {
      }
    }
  },

  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
})
