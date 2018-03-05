const path = require('path')

module.exports = {
  target: 'node',
  mode: 'production',
  module: {
    rules: [{
      test: /\.glsl$/,
      exclude: [/node_modules/],
      use: [
       'raw-loader',
       path.resolve(__dirname, '../../glslify-loader.js')
      ]
    }]
  }
}
