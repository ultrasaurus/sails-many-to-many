var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('org', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: 'string',
    createdAt: 'datetime',
    updatedAt: 'datetime',
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('org', callback);
};
