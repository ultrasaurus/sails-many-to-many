/**
 * Org.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'org',
  attributes: {
    name : { type: 'string' }
  },

  users: {
    collection: 'user',
    via: 'org',
    through: 'orgmembership'
  }

};
