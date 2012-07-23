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
 * The environment module of vsf on hosting environment dependence.
 */

/**
 * The default port when no known host environment port found.
 * This is usually the port for local deployment via make run-dev or make run-prod.
 *
 * Change the default port if needed (when 8080 is used by other process).
 *
 * @type {Number}
 */
var DEFAULT_PORT = 8080;

/**
 * Gets the running deployment port on many hosting services.
 *
 * @return the suitable port for deployment
 */
exports.port = function() {
  return process.env.PORT || //heroku
    process.env.VMC_APP_PORT || //appfog
    process.env.app_port ||  //nodester
    process.env.PORT_WWW || //dotcloud
    DEFAULT_PORT;              //default one
};