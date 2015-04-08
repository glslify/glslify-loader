precision mediump float;

uniform float iGlobalTime;
uniform vec3  iResolution;

vec2 doModel(vec3 p);

#pragma glslify: camera   = require('glsl-turntable-camera')
#pragma glslify: noise    = require('glsl-noise/simplex/4d')
#pragma glslify: raytrace = require('glsl-raytrace', map = doModel, steps = 90)
#pragma glslify: normal   = require('glsl-sdf-normal', map = doModel)

vec2 doModel(vec3 p) {
  float r  = 1.0 + noise(vec4(p, iGlobalTime)) * 0.25;
  float d  = length(p) - r;
  float id = 0.0;

  return vec2(d, id);
}

void main() {
  vec3 color = vec3(0.0);
  vec3 ro, rd;

  float rotation = iGlobalTime;
  float height   = 0.0;
  float dist     = 4.0;
  camera(rotation, height, dist, iResolution.xy, ro, rd);

  vec2 t = raytrace(ro, rd);
  if (t.x > -0.5) {
    vec3 pos = ro + rd * t.x;
    vec3 nor = normal(pos);

    color = nor * 0.5 + 0.5;
  }

  gl_FragColor.rgb = color;
  gl_FragColor.a   = 1.0;
}
