'use strict'

const fs = require('fs')

module.exports.isEmpty = (folder) => {
  try {
    return !fs.readdirSync(folder).length
  } catch (e) {
    console.log(e)
    return false
  }
}
