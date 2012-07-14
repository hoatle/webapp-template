/**
 * The connection module for database' connecting and disconnecting.
 * Currently, only mongodb (mongoose) is supported.
 */

var mongoose = require('mongoose');

// the connection
var conn;

/**
 * Connects to a database with provided vsf.db.config object.
 *
 * @param config the vsf.db.config instance.
 *
 * @return the connection
 */
exports.connect = function(config) {
  conn = mongoose.createConnection(config.getDbUrl());
  return conn;
};

/**
 * Disconnect current connection.
 *
 * @return this module.
 */
exports.disconnect = function() {
  conn.disconnect();
  return this;
};