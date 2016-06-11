var assert = require('chai').assert;

describe('Org', function() {
  describe('#create()', function() {
    it('should create org with name', function (done) {
      var orgName = 'MyOrg'
      Org.create({name:orgName})
      .then(function(org) {
        assert.isNotNull(org);
        assert.equal(org.name, orgName);
        done();
      })
      .catch(done);
    });
  });
});
