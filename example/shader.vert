precision highp float;

attribute vec2 position;
varying vec2 vUv;

void main () {
  vUv = position;
  gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
}