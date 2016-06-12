var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('user', {
    id: { type: 'int', primaryKey: true },
    username: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('user', callback);
};
