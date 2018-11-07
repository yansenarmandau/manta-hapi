const constants = require('./../constants');
const helpers = require('./index');

/**
* CREATE PROJECT STRUCTURE
*
* @param {name: String, authentication: String} options
*/
module.exports.createProjectStructure = (options) => {
  const pathName = '.';
  const { authentication } = options;
  // create folder
  helpers.file.mkdir(`${pathName}/config`);
  helpers.file.mkdir(`${pathName}/plugins`);
  helpers.file.mkdir(`${pathName}/routes`);
  helpers.file.mkdir(`${pathName}/test`);

  // copy code template file
  helpers.package.generate(options);
  helpers.template.copy('server.js', './index.js');
  helpers.config.generate(options);
  switch (authentication) {
    case constants.auth.JWT:
      helpers.template.copy('plugins/jwt-auth.js', './plugins/auth.js');
      break;
    case constants.auth.BASIC:
      helpers.template.copy('plugins/basic-auth.js', './plugins/auth.js');
      break;
  }

  helpers.template.copy('routes/index.js', './routes/index.js');
  helpers.template.copy('test/index.test.js', './test/index.test.js');

  // copy configuration file
  helpers.template.copy('.env.example', './.env.example');
  helpers.template.copy('.eslintrc', './.eslintrc');
  helpers.template.copy('.eslintignore', './.eslintignore');
};
