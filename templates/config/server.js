const Package = require('./../package.json');
require('dotenv').config();

module.exports = {
  host: process.env.NODE_HOST || '0.0.0.0',
  port: process.env.NODE_PORT || 3030,
  env: process.env.NODE_ENV || 'development',
  version: Package.version || '1.0.0'
};
