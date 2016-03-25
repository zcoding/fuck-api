var path = require('path');

module.exports = {

  entry: path.resolve(__dirname, './web/app/main.js'),

  output: {
    path: path.resolve(__dirname, './assets/app/'),
    publicPath: "/app/",
    filename: "app.js",
    chunkFilename: "[id].app.js"
  },

  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },

  vue: {
    loaders: {
      html: 'vue-html?removeRedundantAttributes=false'
    }
  },

  resolve: {
    alias: {
      views: path.resolve(__dirname, './web/app/views'),
      utils: path.resolve(__dirname, './web/app/utils'),
      components: path.resolve(__dirname, './web/app/components')
    }
  },

  devtool: "#inline-source-map"

};
