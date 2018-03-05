# glslify-loader

[glslify](http://github.com/stackgl/glslify) loader module for [webpack](http://webpack.github.io/).

## Installation
```sh
npm install glslify-loader
```

Generally, you'll want to use this alongside webpack's [raw-loader](https://github.com/webpack-contrib/raw-loader) module:
```sh
npm install raw-loader
```

## Usage

[Documentation: Using Loaders in Webpack](https://webpack.js.org/concepts/loaders/#configuration)

##### Configuration file

```js
module.exports = {
  rules: [
    {
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        'raw-loader',
        'glslify-loader'
      ]
    }
  ]
}
```

##### Inline

```js
// Using require
const source = require('raw-loader!glslify-loader!./my-shader.glsl')

// Using ES6 import statement
import source from 'raw-loader!glslify-loader!./my-shader.glsl'
```

##### Speficy source transforms
See [Glslify Source Transforms](https://github.com/glslify/glslify#source-transforms) for details.

```js
module.exports = {
  rules: [
    {
      test: /\.(glsl|frag|vert)$/,
      exclude: /node_modules/,
      use: [
        'raw-loader',
        {
          loader: 'glslify-loader'
          options: {
            transform: [
              ['glslify-hex', { 'option-1': true, 'option-2': 42 }]
            ]
          }
        }
      ]
    }
  ]
}
```


## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing) for details.

## License

MIT. See [LICENSE.md](http://github.com/stackgl/glslify-loader/blob/master/LICENSE.md) for details.
