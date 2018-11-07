'use strict';

const fs = require('fs-extra');
const constants = require('./../constants');

/**
* create file sync
*
* @param {String} path
* @param {String} string
* @param {Integer} mode
*/
module.exports.write = (path, string, mode) => {
  return fs.writeFileSync(path, string, { mode: mode || constants.file.MODE_666 });
};

/**
* mkdir -p
*
* @param {String} path
* @param {Function} fn
*/
module.exports.mkdir = (path) => {
  return fs.mkdirpSync(path, constants.file.MODE_755);
};
