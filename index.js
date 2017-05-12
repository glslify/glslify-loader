// use 'use strict' to avoid let/const errors with old node versions
'use strict'

const path = require('path')
const loaderUtils = require('loader-utils')
const deps = require('glslify-deps')
const bundle = require('glslify-bundle')

function glslifyLoader (content) {
  this.cacheable && this.cacheable()
  const callback = this.async()

  // Parse querystring from require path
  let query = this.query || {}
  if (typeof query === 'string') {
    if (query[0] !== '?') query = '?' + query
    query = loaderUtils.parseQuery(query)
  }

  const depper = deps()
  const basedir = path.dirname(this.resourcePath)

  // Add transforms to the shader and its dependencies
  const transforms = Array.isArray(query.transform) ? query.transform : []
  transforms.forEach(transform => {
    if (typeof transform !== 'string' && !Array.isArray(transform)) return
    const name = Array.isArray(transform) ? transform[0] : transform
    const options = Array.isArray(transform) && transform.length > 1
      ? transform[1] : {}
    depper.transform(name, options)
  })

  // Build the dependency graph
  depper.inline(content, basedir, (err, files) => {
    if (err) return callback(err, null)
    files && files.forEach(file => !file.entry && this.addDependency(file.file))
    const output = bundle(files)
    return callback(err, output)
  })
}

module.exports = glslifyLoader
