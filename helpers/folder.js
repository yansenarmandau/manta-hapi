'use strict'

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports.isEmpty = (folder) => {
  try {
    return !fs.readdirSync(folder).length
  } catch (e) {
    return false
  }
}

module.exports.checkEmptyFolder = (folderName) => {
  if (!this.isEmpty(folderName)) {
    console.log(chalk.red(`
      Your destination folder "${chalk.green(path.resolve(folderName))}" is not empty.
      aborting!!
    `))
    process.exit(1)
  }
}
