const routes = {
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/',
        config: {
          handler: () => ({ status: 'OK!' }),
          description: 'Root API',
          notes: 'Return API status',
          tags: ['api'],
          auth: false
        }
      },
      {
        method: 'GET',
        path: '/user/{userId}',
        config: {
          handler: (request) => {
            const dataUser = {
              1: {
                name: 'john doe',
                age: 25
              }
            };

            return dataUser[request.params.userId];
          },
          description: 'User API',
          notes: 'Return User detail',
          tags: ['api']
        }
      }
    ]);
  },
  name: 'routes-plugin'
};

module.exports = routes;
