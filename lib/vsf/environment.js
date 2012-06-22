/**
 * The environment module of vsf on hosting environment dependence.
 */

/**
 * The default port when no known host environment port found.
 * This is usually the port for local deployment via make run-dev or make run-prod.
 *
 * Change the default port if needed (when 8080 is used by other process).
 *
 * Note: Change the port to 8080 if it is deployed on dotcloud.
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
  //process.env.PORT for heroku
  //process.env.VMC_APP_PORT for appfog
  //process.env['app_port'] for nodester
  //8080 (DEFAULT_PORT) for dotcloud and others
  return process.env.PORT || process.env.VMC_APP_PORT || process.env['app_port'] || DEFAULT_PORT;
};