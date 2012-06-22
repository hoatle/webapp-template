/**
 * The environment module of vsf on hosting environment dependence.
 */

/**
 * Gets the running deployment port on many hosting services.
 *
 * @return the suitable port for deployment
 */
exports.port = function() {
  //process.env.PORT for heroku
  //process.env.VMC_APP_PORT for appfog
  //process.env['app_port'] for nodester
  //8080 for dotcloud and others
  return process.env.PORT || process.env.VMC_APP_PORT || process.env['app_port'] || 8080;
};