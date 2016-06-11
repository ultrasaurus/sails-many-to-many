# sails-many-to-many

a [Sails](http://sailsjs.org) application

With NodeJS

```
$ node -v
v4.4.5
```

Set up the project
```
git clone ...
cd sails-many-to-many
npm install
npm start
```


## How this project was created:
```
npm -g install sails
sails -v                       # version 0.12.3
sails new sails-many-to-many
cd sails-many-to-many
sails generate model user username:email
```

in `config/models.js` (at the bottom):
```
migrate: 'safe'
```

set up for testing
```
npm install mocha chai sails-memory --save-dev --loglevel=error
mkdir -p test/integration/models
echo "--timeout 5s" >> test/mocha.opts

echo "
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
" >> test/bootstrap.test.js
```

create User model test file: `/test/integration/models/User.test.js`;

```
var assert = require('chai').assert;

describe('User', function() {
  describe('#create()', function() {
    it('should create user with email', function (done) {
      var testEmail = 'sue@test.com'
      User.create({username:testEmail})
      .then(function(user) {
        assert.isNotNull(user);
        assert.equal(user.username, testEmail);
        done();
      })
      .catch(done);
    });
  });
});
```
