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
    it('should  not find users', function (done) {
      // verify that database gets cleaned up
      var testEmail = 'sue@test.com'
      User.find()
      .then(function(users) {
        assert.equal(users.length, 0);
        done();
      })
      .catch(done);
    });
  });
  describe('with no orgs', function() {
    beforeEach(function(done) {
      var testEmail = 'sue@test.com'
      User.create({username:testEmail})
      .then(function(user) {
        done()
      })
      .catch(done);
    });
    it('populates empty list of orgs', function(done) {
      User.find().populate('orgs')
      .then(function(users) {
        var user = users[0]
        assert.isNotNull(user.orgs);
        assert.equal(user.orgs.length, 0);
        done();
      })
      .catch(done);
    });
  });
  describe('with orgs', function() {
    beforeEach(function(done) {
      var testEmail = 'sue@test.com';
      var orgName = 'Awesome Org';
      Org.create({name:orgName})
      .then(function(org) {
        return User.create({username:testEmail, orgs:[org]})
      })
      .then(function(user) {
        done()
      })
      .catch(done);
    });
    it('populates empty list of orgs', function(done) {
      User.find().populate('orgs')
      .then(function(users) {
        var user = users[0]
        console.log(user);
        assert.isNotNull(user.orgs);
        assert.equal(user.orgs.length, 1);
        done();
      })
      .catch(done);
    });
  });
});
