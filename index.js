// Use 'use strict' to avoid let/const errors with old Node versions
'use strict'

const path = require('path')
const loaderUtils = require('loader-utils')
const deps = require('glslify-deps')
const bundle = require('glslify-bundle')
const resolve = require('resolve')

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
  const postTransforms = []
  transforms.forEach(transform => {
    if (typeof transform !== 'string' && !Array.isArray(transform)) return
    const name = Array.isArray(transform) ? transform[0] : transform
    const opts = Array.isArray(transform) && transform.length > 1
      ? transform[1] : {}
    // Keep post-transforms for later
    if (opts && opts.post) return postTransforms.push({ name, opts })
    depper.transform(name, opts)
  })

  // Build the dependency graph
  depper.inline(content, basedir, (err, files) => {
    if (err) return callback(err, null)
    files && files.forEach(file => !file.entry && this.addDependency(file.file))
    let output = bundle(files)
    // Apply post-transforms (taken from glslify sourcecode)
    postTransforms.forEach(tr => {
      const target = resolve.sync(tr.name, { basedir })
      const transform = require(target)
      const out = transform(null, output, tr.opts)
      if (out) output = out
    })
    return callback(err, output)
  })
}

module.exports = glslifyLoader
