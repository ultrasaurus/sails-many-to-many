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
