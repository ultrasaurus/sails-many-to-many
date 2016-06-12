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
```

## Set up the database

```
npm install --save sails-db-migrate db-migrate pg sails-postgresql
createdb org_example
```

in `config/models.js` (at the bottom):
```
connection: 'postgresql',
migrate: 'safe'
```

```
echo "
module.exports.migrations = {
  // connection name matches a field from config/connections.js
  connection: 'postgresql'
};
" >> config/migrations.js
```

set up the grunt task

```
echo "
module.exports = require('sails-db-migrate').gruntTasks;
" >> tasks/register/dbMigrate.js
```

## Set up for testing
```
npm install async --save
npm install mocha chai sails-memory --save-dev --loglevel=error
mkdir -p test/integration/models
echo "--timeout 5s" >> test/mocha.opts

echo "
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
" >> test/bootstrap.test.js
```

in `config/connections.js`

```
postgresql: {
  adapter     : 'sails-postgresql',
  host        : 'localhost',
  database    : 'org_example',
},
```

## Create the User model

```
sails generate model user username:email
grunt db:migrate:create --name=user
```

## Create a Test
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


# Set up Related Models
```
sails generate model org name:string
sails generate model OrgMembership userId:integer, orgId:integer
grunt db:migrate:create --name org
```
