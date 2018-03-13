'use strict'

const helpers = require('./index')

module.exports.write = (fileName, content) => {
  return helpers.file.write(`./config/${fileName}`, content)
}

module.exports.generate = (options) => {
  // generate manifest config
  this.write('manifest.js', helpers.template.render('config/manifest.js', options))
  // generate server config
  helpers.template.copy('config/server.js', './config/server.js')
}
