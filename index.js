#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const path = require('path')
const chalk = require('chalk')
const createApp = require('./lib/app').createApp
const helpers = require('./helpers')
const constants = require('./constants')

const questions = [{
  type: 'input',
  name: 'name',
  message: 'Your App name',
  default: 'hapi rest api'
}, {
  type: 'rawlist',
  name: 'authentication',
  message: 'Authentication module?',
  choices: ['none', constants.auth.JWT],
  default: 'none'
}]

const folderName = '.'
if (!helpers.folder.isEmpty(folderName)) {
  console.log(chalk.red(`Your folder "${chalk.green(path.resolve(folderName))}" is not empty.`))
  console.log(chalk.red('process aborting!!'))
  process.exit(1)
}

inquirer.prompt(questions)
  .then(async (answers) => {
    return await createApp(answers)
  })
  .catch((err) => {
    console.log(chalk.red(err))
    process.exit(1)
  })
