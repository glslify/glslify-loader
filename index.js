const glslify = require('glslify')
const path    = require('path')

module.exports = glslifyWebpackLoader

function glslifyWebpackLoader(source) {
  var basedir = path.dirname(this.resourcePath)
  var self = this

  this.callback = this.async()
  this.cacheable(true)

  glslify.bundle(source, {
    inline: true,
    basedir: basedir
  }, function(err, src, files) {
    if (files) {
      files.forEach(function(file) {
        self.addDependency(file)
      })
    }

    return self.callback(err, src)
  })
}
