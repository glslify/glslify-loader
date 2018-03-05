precision mediump float;

#pragma glslify: noise = require(glsl-noise/classic/2d)
#pragma glslify: myFunction = require(./shader-export)

void main () {
  gl_FragColor = vec4(1, 0, 0, 1);
}
