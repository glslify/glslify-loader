var regl = require('regl')()

var fragment = require('./shader.frag')
var vertex = require('./shader.vert')

var size = [0, 0]
window.addEventListener('resize', resize)
resize()

// hot module reloading for the shader files
if (module.hot) {
  module.hot.accept('./shader.frag', function () { fragment = require('./shader.frag') })
  module.hot.accept('./shader.vert', function () { vertex = require('./shader.vert') })
}

var draw = regl({
  frag: function () { return fragment },
  vert: function () { return vertex },
  attributes: {
    position: [
      -2, 0,
      0, -2,
      2, 2
    ]
  },
  uniforms: {
    time: function (f) { return 0.01 * f.tick },
    resolution: function () { return size }
  },
  depth: {
    enable: false
  },
  count: 3
})

regl.frame(function () {
  regl.clear({ color: [0, 0, 0, 1] })
  draw()
})

function resize () {
  size[0] = window.innerWidth
  size[1] = window.innerHeight
}
