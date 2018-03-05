const path = require('path')
const loaderUtils = require('loader-utils')
const resolve = require('resolve')
const deps = require('glslify-deps')
const bundle = require('glslify-bundle')

module.exports = function glslifyLoader (content) {
  this.cacheable && this.cacheable()

  const depper = deps()
  const callback = this.async()

  // Setup options
  const options = Object.assign({
    basedir: path.dirname(this.resourcePath),
    transform: []
  }, loaderUtils.getOptions(this))

  // Handle transforms from options
  const transforms = Array.isArray(options.transform) ? options.transform : []
  const postTransforms = []
  transforms.forEach(transform => {
    if (!Array.isArray(transform)) transform = [String(transform)]
    const name = transform[0]
    const opts = transform[1] || {}
    // Keep post-transforms for later
    if (opts.post) postTransforms.push({ name, opts })
    else depper.transform(name, opts)
  })

  // Build the dependency graph
  depper.inline(content, options.basedir, (err, tree) => {
    if (err) return error(err)
    // Make webpack watch each subdependencies
    tree && tree.forEach(file => !file.entry && this.addDependency(file.file))
    // Bundle the glsl output
    const output = String(bundle(tree))
    // Start applying post transforms
    nextPostTransform(null, output)
  })

  // Iterate over each post transforms
  function nextPostTransform (err, output) {
    if (err) return error(err)
    const transform = postTransforms.shift()
    if (!transform) return done(output)
    resolve(transform.name, { basedir: options.basedir }, (err, target) => {
      if (err) return error(err)
      require(target)(null, output, transform.opts, nextPostTransform)
    })
  }

  function error (err) {
    callback(err, null)
  }

  function done (output) {
    callback(null, output)
  }
}
