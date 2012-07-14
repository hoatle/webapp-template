/**
 * The db configuration module for database connection.
 * A db string is constructed with this pattern:
 * dbType://[username][:password]@address[:port]/dbName
 *
 * dbType could be mongodb, mysql...
 * username, password, port could be optional.
 */

var _ = require('underscore');


var TYPE = {
  MONGODB: 'mongodb',
  MYSQL: 'mysql'
};

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

  //default port
  if (!this.port) {
    if (this.type === TYPE.MONGODB) {
      this.port = 27017;
    } else if (this.type === TYPE.MYSQL) {
      this.port = 3306;
    }
  }
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
   * Constructs the db url string basing on provided params.
   */
  getDbUrl: function() {
    var usernamePassword = '';
    if (this.username && this.password) {
      usernamePassword = this.username + ':' + this.password + '@';
    }

    return this.type + '://' + usernamePassword + this.address + ':' + this.port + '/' + this.dbName;
  }

});


/**
 * The config exporter api.
 * @param params
 */
module.exports = function(params) {
  return new Config(params);
};

module.exports.TYPE = TYPE;