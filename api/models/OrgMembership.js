/**
 * OrgMembership.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'org_membership',
  attributes: {
    user_id: { type: 'integer', foreignKey: true},
    user: { model: 'User', columnName: 'user_id' },
    org: { model: 'Org',  foreignKey: true, columnName: 'org_id' }

  }
};
