#!/usr/bin/env node
'use strict'

const spawn = require('cross-spawn')
const execSync = require('child_process').execSync
const path = require('path')
const chalk = require('chalk')
const helpers = require('../helpers')

module.exports.createApp = (options) => {
  const pathName = '.'
  try {
    console.log()
    console.log(`Creating app in ${chalk.green(path.resolve(pathName))}`)
    console.log()
    helpers.app.createProjectStructure(options)

    console.log(`Installing packages, please wait this might take a minutes`)
    console.log()
    try {
      const installPackages = spawn.sync('npm', ['install', '--save'], { stdio: 'inherit' })
      if (installPackages.status !== 0) {
        process.exit(1)
      }
      execSync('npm run lint -- --fix')
      console.log()
      console.log(`
        Creating was successfully!
        Please following commands:

        ${chalk.blue(`  npm run dev`)}
          Start App in development mode with live reload.

        ${chalk.blue(`  npm run start`)}
          Start App.

        ${chalk.blue(`  npm run test`)}
          Start unit test.

        ${chalk.blue(`  npm run lint`)}
          Start linting.


        Good luck!
      `)
      console.log()
    } catch (e) {
      console.log(chalk.red(e))
      process.exit(1)
    }
  } catch (e) {
    console.log(chalk.red(e))
    process.exit(1)
  }
}
