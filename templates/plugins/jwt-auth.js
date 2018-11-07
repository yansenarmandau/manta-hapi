require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const auth = {
  register: (server) => {
    // token
    server.auth.strategy('jwt', 'hapi-auth-jwt2', {
      key: SECRET_KEY,
      validate: async (decoded) => {
        const isValid = true;

        return { isValid, decoded };
      },
      verifyOptions: { algorithms: [ 'HS256' ] }
    });

    // all routes by default will be protected
    server.auth.default('jwt');
  },
  name: 'authentication-plugin'
};

module.exports = auth;
