/**
 * The db configuration module for database connection.
 * A db string is constructed with this pattern:
 * dbType://[username][:password]@address[:port]/dbName
 *
 * dbType could be mongodb, mysql...
 * username, password, port could be optional.
 */

var _ = require('underscore');


/**
 * The config constructor.
 *
 * @constructor
 */
function Config(params) {
  this.type = params.type;
  this.username = params.username;
  this.password = params.password;
  this.address = params.address;
  this.port = params.port;
  this.dbName = params.dbName;
}

_.extend(Config.prototype, {
  getType: function() {
    return this.type;
  },
  getUsername: function() {
    return this.username;
  },
  getPassword: function() {
    return this.password;
  },
  getAddress: function() {
    return this.address;
  },
  getPort: function() {
    return this.port;
  },
  getDbName: function() {
    return this.dbName;
  },
  /**
   * Constructs the db string based on provided params.
   */
  getDbString: function() {
    //full params
    //TODO handle optional params
    return this.type + '://' + this.username + ':' + this.password + '@' + this.address + ':' + this.port + '/' + this.dbName;
  }

});


/**
 * The config exporter api.
 * @param params
 */
module.exports = function(params) {
  return new Config(params);
};

module.exports.TYPE = {
  MONGODB: 'mongodb',
  MYSQL: 'mysql'
};