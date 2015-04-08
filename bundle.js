/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	document.querySelector('[name="orig"]').value = __webpack_require__(1)
	document.querySelector('[name="post"]').value = __webpack_require__(2)


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "precision mediump float;\n\nuniform float iGlobalTime;\nuniform vec3  iResolution;\n\nvec2 doModel(vec3 p);\n\n#pragma glslify: camera   = require('glsl-turntable-camera')\n#pragma glslify: noise    = require('glsl-noise/simplex/4d')\n#pragma glslify: raytrace = require('glsl-raytrace', map = doModel, steps = 90)\n#pragma glslify: normal   = require('glsl-sdf-normal', map = doModel)\n\nvec2 doModel(vec3 p) {\n  float r  = 1.0 + noise(vec4(p, iGlobalTime)) * 0.25;\n  float d  = length(p) - r;\n  float id = 0.0;\n\n  return vec2(d, id);\n}\n\nvoid main() {\n  vec3 color = vec3(0.0);\n  vec3 ro, rd;\n\n  float rotation = iGlobalTime;\n  float height   = 0.0;\n  float dist     = 4.0;\n  camera(rotation, height, dist, iResolution.xy, ro, rd);\n\n  vec2 t = raytrace(ro, rd);\n  if (t.x > -0.5) {\n    vec3 pos = ro + rd * t.x;\n    vec3 nor = normal(pos);\n\n    color = nor * 0.5 + 0.5;\n  }\n\n  gl_FragColor.rgb = color;\n  gl_FragColor.a   = 1.0;\n}\n"

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "#define GLSLIFY 1\n\nprecision mediump float;\n\nuniform float iGlobalTime;\nuniform vec3  iResolution;\n\nvec2 doModel(vec3 p);\n\nvec2 squareFrame_6_0(vec2 screenSize) {\n  vec2 position = 2.0 * (gl_FragCoord.xy / screenSize.xy) - 1.0;\n  position.x *= screenSize.x / screenSize.y;\n  return position;\n}\n\nvec2 squareFrame_6_0(vec2 screenSize, vec2 coord) {\n  vec2 position = 2.0 * (coord.xy / screenSize.xy) - 1.0;\n  position.x *= screenSize.x / screenSize.y;\n  return position;\n}\n\n\n\nmat3 calcLookAtMatrix_7_1(vec3 origin, vec3 target, float roll) {\n  vec3 rr = vec3(sin(roll), cos(roll), 0.0);\n  vec3 ww = normalize(target - origin);\n  vec3 uu = normalize(cross(ww, rr));\n  vec3 vv = normalize(cross(uu, ww));\n\n  return mat3(uu, vv, ww);\n}\n\n\n\n\nvec3 getRay_5_2(mat3 camMat, vec2 screenPos, float lensLength) {\n  return normalize(camMat * vec3(screenPos, lensLength));\n}\n\nvec3 getRay_5_2(vec3 origin, vec3 target, vec2 screenPos, float lensLength) {\n  mat3 camMat = calcLookAtMatrix_7_1(origin, target, 0.0);\n  return getRay_5_2(camMat, screenPos, lensLength);\n}\n\n\n\n\nvoid orbitCamera_2_3(\n  in float camAngle,\n  in float camHeight,\n  in float camDistance,\n  in vec2 screenResolution,\n  out vec3 rayOrigin,\n  out vec3 rayDirection\n) {\n  vec2 screenPos = squareFrame_6_0(screenResolution);\n  vec3 rayTarget = vec3(0.0);\n\n  rayOrigin = vec3(\n    camDistance * sin(camAngle),\n    camHeight,\n    camDistance * cos(camAngle)\n  );\n\n  rayDirection = getRay_5_2(rayOrigin, rayTarget, screenPos, 2.0);\n}\n\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_1_4(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nfloat mod289_1_4(float x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nvec4 permute_1_5(vec4 x) {\n     return mod289_1_4(((x*34.0)+1.0)*x);\n}\n\nfloat permute_1_5(float x) {\n     return mod289_1_4(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_6(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt_1_6(float r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4_1_7(float j, vec4 ip)\n  {\n  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n  vec4 p,s;\n\n  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n  s = vec4(lessThan(p, vec4(0.0)));\n  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n  return p;\n  }\n\n// (sqrt(5) - 1)/4 = F4, used once below\n#define F4 0.309016994374947451\n\nfloat snoise_1_8(vec4 v)\n  {\n  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\n                        0.276393202250021,  // 2 * G4\n                        0.414589803375032,  // 3 * G4\n                       -0.447213595499958); // -1 + 4 * G4\n\n// First corner\n  vec4 i  = floor(v + dot(v, vec4(F4)) );\n  vec4 x0 = v -   i + dot(i, C.xxxx);\n\n// Other corners\n\n// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\n  vec4 i0;\n  vec3 isX = step( x0.yzw, x0.xxx );\n  vec3 isYZ = step( x0.zww, x0.yyz );\n//  i0.x = dot( isX, vec3( 1.0 ) );\n  i0.x = isX.x + isX.y + isX.z;\n  i0.yzw = 1.0 - isX;\n//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\n  i0.y += isYZ.x + isYZ.y;\n  i0.zw += 1.0 - isYZ.xy;\n  i0.z += isYZ.z;\n  i0.w += 1.0 - isYZ.z;\n\n  // i0 now contains the unique values 0,1,2,3 in each channel\n  vec4 i3 = clamp( i0, 0.0, 1.0 );\n  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n  //  x0 = x0 - 0.0 + 0.0 * C.xxxx\n  //  x1 = x0 - i1  + 1.0 * C.xxxx\n  //  x2 = x0 - i2  + 2.0 * C.xxxx\n  //  x3 = x0 - i3  + 3.0 * C.xxxx\n  //  x4 = x0 - 1.0 + 4.0 * C.xxxx\n  vec4 x1 = x0 - i1 + C.xxxx;\n  vec4 x2 = x0 - i2 + C.yyyy;\n  vec4 x3 = x0 - i3 + C.zzzz;\n  vec4 x4 = x0 + C.wwww;\n\n// Permutations\n  i = mod289_1_4(i);\n  float j0 = permute_1_5( permute_1_5( permute_1_5( permute_1_5(i.w) + i.z) + i.y) + i.x);\n  vec4 j1 = permute_1_5( permute_1_5( permute_1_5( permute_1_5 (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\n// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n  vec4 p0_1_9 = grad4_1_7(j0,   ip);\n  vec4 p1 = grad4_1_7(j1.x, ip);\n  vec4 p2 = grad4_1_7(j1.y, ip);\n  vec4 p3 = grad4_1_7(j1.z, ip);\n  vec4 p4 = grad4_1_7(j1.w, ip);\n\n// Normalise gradients\n  vec4 norm = taylorInvSqrt_1_6(vec4(dot(p0_1_9,p0_1_9), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_9 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  p4 *= taylorInvSqrt_1_6(dot(p4,p4));\n\n// Mix contributions from the five corners\n  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\n  m0 = m0 * m0;\n  m1 = m1 * m1;\n  return 49.0 * ( dot(m0*m0, vec3( dot( p0_1_9, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n\n  }\n\n\n\n// Originally sourced from https://www.shadertoy.com/view/ldfSWs\n// Thank you Iñigo :)\n\nvec2 calcRayIntersection_3_10(vec3 rayOrigin, vec3 rayDir, float maxd, float precis) {\n  float latest = precis * 2.0;\n  float dist   = +0.0;\n  float type   = -1.0;\n  vec2  res    = vec2(-1.0, -1.0);\n\n  for (int i = 0; i < 90; i++) {\n    if (latest < precis || dist > maxd) break;\n\n    vec2 result = doModel(rayOrigin + rayDir * dist);\n\n    latest = result.x;\n    type   = result.y;\n    dist  += latest;\n  }\n\n  if (dist < maxd) {\n    res = vec2(dist, type);\n  }\n\n  return res;\n}\n\nvec2 calcRayIntersection_3_10(vec3 rayOrigin, vec3 rayDir) {\n  return calcRayIntersection_3_10(rayOrigin, rayDir, 20.0, 0.001);\n}\n\n\n\n// Originally sourced from https://www.shadertoy.com/view/ldfSWs\n// Thank you Iñigo :)\n\nvec3 calcNormal_4_11(vec3 pos, float eps) {\n  const vec3 v1 = vec3( 1.0,-1.0,-1.0);\n  const vec3 v2 = vec3(-1.0,-1.0, 1.0);\n  const vec3 v3 = vec3(-1.0, 1.0,-1.0);\n  const vec3 v4 = vec3( 1.0, 1.0, 1.0);\n\n  return normalize( v1 * doModel( pos + v1*eps ).x +\n                    v2 * doModel( pos + v2*eps ).x +\n                    v3 * doModel( pos + v3*eps ).x +\n                    v4 * doModel( pos + v4*eps ).x );\n}\n\nvec3 calcNormal_4_11(vec3 pos) {\n  return calcNormal_4_11(pos, 0.002);\n}\n\n\n\n\nvec2 doModel(vec3 p) {\n  float r  = 1.0 + snoise_1_8(vec4(p, iGlobalTime)) * 0.25;\n  float d  = length(p) - r;\n  float id = 0.0;\n\n  return vec2(d, id);\n}\n\nvoid main() {\n  vec3 color = vec3(0.0);\n  vec3 ro, rd;\n\n  float rotation = iGlobalTime;\n  float height   = 0.0;\n  float dist     = 4.0;\n  orbitCamera_2_3(rotation, height, dist, iResolution.xy, ro, rd);\n\n  vec2 t = calcRayIntersection_3_10(ro, rd);\n  if (t.x > -0.5) {\n    vec3 pos = ro + rd * t.x;\n    vec3 nor = calcNormal_4_11(pos);\n\n    color = nor * 0.5 + 0.5;\n  }\n\n  gl_FragColor.rgb = color;\n  gl_FragColor.a   = 1.0;\n}\n"

/***/ }
/******/ ]);