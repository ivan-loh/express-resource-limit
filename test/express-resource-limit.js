'use strict';

const http    = require('http');
const request = require('supertest');

const resourceLimit = require('..');


describe('resourceLimit()', function () {


  it('should do nothing by default', function(done) {

    const server = createServer({});
    request(server)
      .get('/')
      .expect(200, done);

  });


  it('should be able to skip', function (done) {

    const skipServer = createServer({skip: (req, res) => {
      return false;
    }});

    request(skipServer)
      .get('/')
      .expect(200, done);

  });



});


function createServer(options) {

  const _resourceLimit = resourceLimit(options);

  return http.createServer(function(req, res) {
    _resourceLimit(req, res, function(err) {
      res.statusCode = err ? (err.status || 500) : 200;
      res.end(err ? err.message : JSON.stringify(req.body));
    });

  });

}
