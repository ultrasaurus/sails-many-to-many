
var async = require('async');
var sails = require('sails');

before(function(done) {
  sails.lift({
    // test config
    environment: 'test',
    port: 9999,   // so we can run the app and tests at the same time
    hostName: 'localhost:9999',
    // connections: {
    //   testDB: {
    //     adapter: 'sails-memory'
    //   }
    // },
    models: {
      connection: 'postgresql'
    },
  }, function(err, server) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

afterEach(function(done) {
  destroyFuncs = [];
  for (modelName in sails.models) {
    destroyFuncs.push(function(callback) {
      sails.models[modelName].destroy({})
      .exec(function(err) {
        callback(null, err)
      });
    })
  }
  async.parallel(destroyFuncs, function(err, results) {
    done(err);
  })
});

after(function(done) {
  sails.lower(done);
})
