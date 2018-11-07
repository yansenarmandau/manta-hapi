const semver = require('semver');
const chalk = require('chalk');

module.exports.checkNode = () => {
  if (!semver.satisfies(process.version, '>=6.0.0')) {
    console.log();
    console.log(`
      You are using Node ${process.version}
    `);

    console.log(chalk.red(`
      Manta require Node 6 or higher.
      Please update your node version.
    `));

    process.exit(1);
  }
};
