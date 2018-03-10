const pkg = require('./../templates/package')
const helpers = require('./index')

module.exports.generate = (options) => {

  const dependencies = {}

  switch (options.authentication) {
    case 'jwt':
      dependencies['@now-ims/hapi-now-auth'] = '^1.0.1'
      break
    case 'basic':
      dependencies['hapi-auth-basic'] = '^5.0.0'
      break
  }

  pkg['name'] = options.name
  pkg['dependencies'] = Object.assign(pkg.dependencies, dependencies)

  helpers.file.write('./package.json', JSON.stringify(pkg, null, 2))
}
