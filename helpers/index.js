'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {};

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    module.exports[file.replace('.js', '')] = require(path.resolve(__dirname, file));
  });
