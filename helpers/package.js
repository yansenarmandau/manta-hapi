const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');
const pkg = require('./../templates/package');
const helpers = require('./index');

module.exports.generate = (options) => {
  const dependencies = {};

  switch (options.authentication) {
    case 'jwt':
      dependencies['hapi-auth-jwt2'] = '^8.1.0';
      break;
    case 'basic':
      dependencies['hapi-auth-basic'] = '^5.0.0';
      break;
  }

  pkg['name'] = options.name;
  pkg['dependencies'] = Object.assign(pkg.dependencies, dependencies);

  helpers.file.write('./package.json', JSON.stringify(pkg, null, 2));
};

module.exports.checkAppName = (appName) => {
  const result = validateProjectName(appName);
  if (!result.validForNewPackages) {
    console.error(
      `Your Application name ${chalk.green(appName)} is not valid for npm project naming.`
    );
    console.log();
    console.log(`${chalk.red(result.errors[0])}`);
    console.log();

    process.exit(1);
  }
  return appName;
};
