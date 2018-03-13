#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const chalk = require('chalk')
const createApp = require('./app').createApp
const constants = require('./../constants')
const helpers = require('./../helpers')

const questions = [{
  type: 'input',
  name: 'name',
  message: 'Your App name',
  default: 'hapi-rest-api'
}, {
  type: 'rawlist',
  name: 'authentication',
  message: 'Authentication module?',
  choices: ['none', constants.auth.JWT],
  default: 'none'
}]

inquirer.prompt(questions)
  .then((answers) => {
    // check for valid app name
    helpers.package.checkAppName(answers.name)

    return createApp(answers)
  })
  .catch((err) => {
    console.log(chalk.red(err))
    process.exit(1)
  })
