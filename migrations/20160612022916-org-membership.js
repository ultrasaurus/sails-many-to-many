var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('org_membership', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: 'int',
    org_id: 'int',
    createdAt: 'datetime',
    updatedAt: 'datetime',
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('org_membership', callback);
};
