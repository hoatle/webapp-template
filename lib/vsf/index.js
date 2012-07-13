/**
 * The common vsf module
 */

function appDir() {
  return process.cwd();
}

/**
 * To avoid using relative path, use this.
 *
 * module must start with a '/'.
 *
 * @param module
 * @return {*}
 */
function requireRelative(module) {
  return require(appDir() + module);
}

/**
 * Gets the application directory
 *
 * @type {Function}
 */
exports.appDir = appDir;

/**
 * Requires any module that is appended as: appDir() + module.
 * This is usually intended for shallow require, typical on unit tests.
 *
 * @type {Function}
 */
exports.require = requireRelative;