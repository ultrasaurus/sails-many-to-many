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
});
