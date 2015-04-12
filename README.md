# glslify-loader

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

[glslify](http://github.com/stackgl/glslify) loader module for [webpack](http://webpack.github.io/).

## Installation

Generally, you'll want to use this alongside webpack's
`raw-loader` module:

``` bash
npm install --save glslify-loader raw-loader
```

## Usage

[![NPM](https://nodei.co/npm/glslify-loader.png)](https://nodei.co/npm/glslify-loader/)

[Documentation: Using Loaders](http://webpack.github.io/docs/using-loaders.html)

Once installed, you should be able to require your shaders
like so to have them bundled at build time:

``` javascript
var source = require('glslify!raw!./my-shader.glsl')
```

### Configuration

Alternatively, you may apply these loaders automatically
to all `.glsl`, `.frag` and `.vert` files by adding some
additional configuration:

``` javascript
module.exports = {
  module: {
    loaders: [
      { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ }
    ]
  }
}
```

## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing) for details.

## License

MIT. See [LICENSE.md](http://github.com/stackgl/glslify-loader/blob/master/LICENSE.md) for details.
