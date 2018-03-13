#!/usr/bin/env node
'use strict'

const helpers = require('./helpers')

// check Node version support
helpers.env.checkNode()

// make sure destination folder is empty
const folderName = '.'
helpers.folder.checkEmptyFolder(folderName)

require('./lib/cli')
