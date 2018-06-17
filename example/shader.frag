precision highp float;

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

#pragma glslify: aastep = require('glsl-aastep')

varying vec2 vUv;

uniform vec2 resolution;
uniform float time;

// You can edit these values to see your changes without a page refresh
const float size = 0.3;
const vec3 boxColor = vec3(0.950, 0.982, 0.470);
const vec3 bgColor = vec3(0.159, 0.164, 0.215);
const float speed = 5.9;

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

float getAngle(float time) {
  return sin(time * speed) * 0.8 + time * 1.3;
}

void main () {

  vec2 box = vUv.xy - 0.5;
  if (resolution.y >= resolution.x) {
    box.y *= resolution.y / resolution.x;
  } else {
    box.x *= resolution.x / resolution.y;
  }

  float ang = getAngle(time);
  ang += box.y * (ang - getAngle(time - 0.01)) * 10.;
  box = rotate(box, ang);
  box += 0.5;

  float s = 0.5 - size * 0.5;
  float inBox = aastep(s, box.x)
    * aastep(s, box.y)
    * aastep(s, 1.0 - box.x)
    * aastep(s, 1.0 - box.y);


  vec3 color = mix(bgColor, boxColor, inBox);

  gl_FragColor = vec4(color, 1.0);
}