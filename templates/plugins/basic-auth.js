require('dotenv').config();

const user = {
  username: 'test-account',
  password: 'password'
};

const validate = (request, username, password) => {
  if (!(user.username === username && user.password === password)) {
    return {isValid: false, credentials: null};
  }

  return { isValid: true, credentials: { name: username } };
};

const auth = {
  register: (server) => {
    // token
    server.auth.strategy('simple', 'basic', { validate });

    // all routes by default will be protected
    server.auth.default('simple');
  },
  name: 'authentication-plugin'
};

module.exports = auth;
