var assert = require('chai').assert;

describe('OrgMembership', function() {
  describe('#create()', function() {
    it('should create OrgMembership', function (done) {
      var org, user;
      var orgName = 'MyOrg';
      var email = 'jo@foo.com';
      Org.create({name:orgName})
      .then(function(newOrg) {
        org = newOrg;
        return User.create({username:email})
      })
      .then(function(newUser) {
        user = newUser;
        return OrgMembership.create({user:user, org:org})
      })
      .then(function(om) {
        assert.isNotNull(om);
        console.log('om', om);
        assert.equal(om.org, org.id);
        assert.equal(om.user, user.id);
        done();
      })
      .catch(done);
    });
  });
});
