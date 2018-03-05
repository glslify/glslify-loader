float myFunction(vec3 normal) {
  vec3 hello = vec3(1, 0, 0)
  return dot(hello, normal);
}

#pragma glslify: export(myFunction)