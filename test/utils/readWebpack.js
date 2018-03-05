const path = require('path')
const webpack = require('webpack')
const MemoryFileSystem = require('memory-fs')
const requireFromString = require('require-from-string')

const FIXTURESROOT = path.join(__dirname, '..', 'fixtures')

module.exports = function readWebpack (configpath, entrypath) {
  return new Promise((resolve, reject) => {
    const config = require(path.resolve(FIXTURESROOT, configpath))
    config.entry = path.resolve(FIXTURESROOT, entrypath)
    if (!config.output) config.output = {}
    Object.assign(config.output, {
      path: '/',
      filename: 'bundle.js',
      libraryTarget: 'umd'
    })

    const compiler = webpack(config)
    const memfs = new MemoryFileSystem()
    compiler.outputFileSystem = memfs
    compiler.run((err, stats) => {
      if (err) return reject(err)
      if (stats.compilation.errors && stats.compilation.errors.length > 0) {
        return reject(stats.compilation.errors[0])
      }
      const bundleContent = String(memfs.readFileSync('/bundle.js'))
      const output = requireFromString(bundleContent).trim()
      resolve(output)
    })
  })
}
