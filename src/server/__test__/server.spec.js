import 'regenerator-runtime/runtime'
const request = require('supertest');

describe('express server', () => {
  let server;
  beforeEach(function () {
    server = require('../server');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
})