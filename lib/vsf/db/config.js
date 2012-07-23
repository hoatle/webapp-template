/*
 * Copyright (C) hoatle
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The db configuration module for database connection.
 * A db string is constructed with this pattern:
 * dbType://[username][:password]@address[:port]/dbName
 *
 * dbType could be mongodb, mysql...
 * username, password, port could be optional.
 */

var _ = require('underscore'),
  logger = require('../../logger');


var TYPE = {
  MONGODB: 'mongodb',
  MYSQL: 'mysql'
};

var dbUrlRegExp = /^(\w+):\/\/(.+:.+@)*(.+):(\d+)\/(\w+)$/,
    userNamePasswordRegExp = /^(.+):(.+)@$/;

/**
 * The config constructor.
 *
 * @constructor
 */
function Config(params) {
  if (params.dbUrl) {
    this.dbUrl = params.dbUrl;
    parseDbUrl.call(this);
  } else {
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

    setDbUrl.call(this);
  }

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
    return parseInt(this.port, 10);
  },
  getDbName: function() {
    return this.dbName;
  },
  /**
   * Constructs the db url string basing on provided params.
   */
  getDbUrl: function() {
    logger.debug('config.dbUrl', this.dbUrl);
    return this.dbUrl;
  }

});

function parseDbUrl() {
  var dbUrl = this.dbUrl;

  if (!dbUrlRegExp.test(dbUrl)) {
    throw new Error('config.dbUrl format is not valid: ' + dbUrl);
  }

  var dbUrlMatched = dbUrlRegExp.exec(dbUrl).slice(1);

  this.type = dbUrlMatched[0];
  if (userNamePasswordRegExp.test(dbUrlMatched[1])) {
    var usrPwdMatched = userNamePasswordRegExp.exec(dbUrlMatched[1]).slice(1);
    this.username = usrPwdMatched[0];
    this.password = usrPwdMatched[1];
  }
  this.address = dbUrlMatched[2];
  this.port = dbUrlMatched[3];
  this.dbName = dbUrlMatched[4];
}

function setDbUrl() {
  var usernamePassword = '';
  if (this.username && this.password) {
    usernamePassword = this.username + ':' + this.password + '@';
  }

  this.dbUrl = this.type + '://' + usernamePassword + this.address + ':' + this.port + '/' + this.dbName;
}


/**
 * The config exporter api.
 * @param params
 */
module.exports = function(params) {
  return new Config(params);
};

module.exports.TYPE = TYPE;
