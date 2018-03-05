const test = require('tape')
const webpack = require('./utils/readWebpack')

test('simple glsl file with local & external dependencies', t => {
  webpack('config-simple.js', 'entry-simple.js')
    .then(data => {
      t.ok(~data.indexOf('#define GLSLIFY 1'), '#define GLSLIFY 1 was added')
      t.ok(~data.indexOf('GLSL textureless classic 2D noise "cnoise"'), 'node module glsl-noise was included')
      t.ok(~data.indexOf('cnoise('), 'cnoise was not renamed')
      t.ok(~data.indexOf('vec3 hello ='), 'local dependency shader-export.glsl was included')
      t.end()
    })
    .catch(err => t.fail(err))
})

test('glslify-loader using a transform option (glslify-fancy-imports)', t => {
  webpack('config-transform.js', 'entry-transform.js')
    .then(data => {
      t.ok(~data.indexOf('vec3 hello ='), 'local dependency shader-export.glsl was included')
      t.end()
    })
    .catch(err => t.fail(err))
})

test('glslify-loader using post transforms (glslify-hex)', t => {
  webpack('config-post.js', 'entry-post.js')
    .then(data => {
      t.ok(!~data.indexOf('#00FF00'), '#00FF00 transformed away with glslify-hex')
      t.end()
    })
    .catch(err => t.fail(err))
})


test('inline use', t => {
  webpack('config-inline.js', 'entry-inline.js')
    .then(data => {
      t.ok(~data.indexOf('#define GLSLIFY 1'), '#define GLSLIFY 1 was added')
      t.ok(~data.indexOf('GLSL textureless classic 2D noise "cnoise"'), 'node module glsl-noise was included')
      t.end()
    })
    .catch(err => t.fail(err))
})
