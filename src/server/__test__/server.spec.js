const request = require('supertest');

describe('express server', () => {
  let server;
  beforeEach(function () {
    server = require('../server');
  });
  it('responds to /', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
})