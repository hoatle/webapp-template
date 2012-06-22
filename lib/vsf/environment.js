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
         process.env['app_port'] ||  //nodester
         process.env['PORT_NODEJS'] || //dotcloud
         DEFAULT_PORT;                 //default one
};