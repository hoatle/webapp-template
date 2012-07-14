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