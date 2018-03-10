'use strict'

const Hapi = require('hapi')
const routes = require('./../routes')

describe('Api Test', () => {
  let server

  beforeAll(async (done) => {
    server = Hapi.server({
      port: 8080
    })
    await server.register(routes)
    done()
  })

  afterAll(async (done) => {
    await server.stop()
    done()
  })

  test('api response success', async (done) => {
    const response = await server.inject({
      method: 'GET',
      url: '/'
    })
    expect(response.statusCode).toBe(200)
    done()
  })
})
