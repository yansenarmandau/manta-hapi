'use strict'

const fs = require('fs-extra')
const path = require('path')
const template = require('lodash.template')
const beautify = require('js-beautify')
const helpers = require('./index')

module.exports.render = (filePath, options) => {
  const strTemplate = fs.readFileSync(path.resolve(__dirname, '..', 'templates', filePath)).toString()
  const content = beautify(template(strTemplate)(options || {}), {
    indent_size: 2,
    preserve_newlines: true,
    end_with_newline: true
  })

  return content
}

module.exports.copy = (from, to) => {
  from = path.join(__dirname, '..', 'templates', from)
  return fs.copySync(from, to)
  // return helpers.file.write(to, fs.readFileSync(from))
}
