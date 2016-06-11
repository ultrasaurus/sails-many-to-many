
var sails = require('sails');

before(function(done) {
  sails.lift({
    // test config
    environment: 'test',
    port: 9999,   // so we can run the app and tests at the same time
    hostName: 'localhost:9999',
    connections: {
      testDB: {
        adapter: 'sails-memory'
      }
    },
    models: {
      connection: 'testDB'
    },
  }, function(err, server) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});

beforeEach(function(done) {
  // Drops database between each test.  This works because we use
  // the memory database
  sails.once('hook:orm:reloaded', done);
  sails.emit('hook:orm:reload');
});
