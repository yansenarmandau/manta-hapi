'use strict'

const spawn = require('cross-spawn')
const execSync = require('child_process').execSync
const path = require('path')
const chalk = require('chalk')
const helpers = require('../helpers')
const constants = require('../constants')

module.exports.createApp = (options) => {
  const { authentication } = options
  options.name = options.name.replace(/\s/g, '-')
  const pathName = '.'

  try {
    console.log()
    console.log(`Creating app in ${chalk.green(path.resolve(pathName))}`)
    console.log()

    // create folder
    helpers.file.mkdir(`${pathName}/config`)
    helpers.file.mkdir(`${pathName}/plugins`)
    helpers.file.mkdir(`${pathName}/routes`)
    helpers.file.mkdir(`${pathName}/test`)

    // copy code template file
    helpers.package.generate(options)
    helpers.template.copy('server.js', './index.js')
    helpers.config.generate(options)
    authentication === constants.auth.JWT && helpers.template.copy('plugins/auth.js', './plugins/auth.js')
    helpers.template.copy('routes/index.js', './routes/index.js')
    helpers.template.copy('test/index.test.js', './test/index.test.js')

    // copy configuration file
    helpers.template.copy('.env.example', './.env.example')
    helpers.template.copy('.eslintrc', './.eslintrc')
    helpers.template.copy('.eslintignore', './.eslintignore')
    helpers.template.copy('.gitignore', './.gitignore')

    try {
      console.log(`Installing packages, please wait this might take a minutes`)
      console.log()
      try {
        spawn.sync('npm', ['install', '--save', '--save-exact', '--loglevel'], { stdio: 'inherit'})
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
  } catch (e) {
    console.log(chalk.red(e))
    process.exit(1)
  }
}
