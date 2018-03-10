require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const auth = {
  register: (server, options) => {
    // token
    server.auth.strategy('jwt', 'hapi-now-auth', {
      verifyJWT: true,
      keychain: [SECRET_KEY],
      validate: async (reques, token, h) => {
        const isValid = true
        const credentials = token.decodedJWT

        return { isValid, credentials }
      }
    })

    // all routes by default will be protected
    server.auth.default('jwt')
  },
  name: 'authentication-plugin'
}

module.exports = auth
