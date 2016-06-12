/**
 * OrgMembership.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'org_membership',
  attributes: {
    user: { model: 'User', columnName: 'user_id', foreignKey: true},
    org: { model: 'Org',  columnName: 'org_id', foreignKey: true}
  }
};
