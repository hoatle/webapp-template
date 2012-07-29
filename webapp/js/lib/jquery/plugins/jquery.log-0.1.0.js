/**
 * jQuery log plugin.
 *
 * By default, the log level is set to 'trace'. This is good for development.
 * On production mode, need to change it to 'info' with: $.log.setLevel('info').
 *
 * APIs:
 * $.log(level, msg, obj) or shortcut: $.trace, $.info, $.warn, $.error.
 *
 * or $().log(level, msg, obj) or shortcut: $().trace, $().info, $().warn, $().error.
 *
 */
(function ($) {

  'use strict';

  /**
   * All supported log levels.
   *
   * @type {Object}
   */
  var LEVEL = {
    TRACE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4
  };

  /**
   * The default log level is 'TRACE'.
   *
   * @type {Number}
   */
  var allowedLevel = LEVEL.TRACE;

  /**
   * The main logging method.
   *
   * @param level
   * @param msg
   * @param obj
   * @return {*}
   */
  var log = function (level, msg, obj) {

    if (window.console) {

      var logMethod;

      if (level !== 'trace') {
        logMethod = console[level];
      }

      if (!logMethod) {
        logMethod = console.log;
      }

      if (obj) {
        logMethod.call(console, "[%s] %s: %o", level.toUpperCase(), msg, obj);
      } else {
        logMethod.call(console, "[%s] %s", level.toUpperCase(), msg);
      }

      //stack tracing for the error log
      if (level === 'error' && console.trace) {
        console.trace();
      }
    }

    //keep chaining
    return this;
  };

  /**
   * Exposes log levels.
   *
   * @type {Object}
   */
  log.LEVEL = LEVEL;

  /**
   * Sets the log level for logging or not.
   * By default, all levels are logged.
   * On production mode, need to change it to higher level, recommended: $.log.setLevel($.log.LEVEL.INFO);
   *
   * @param newAllowedLevel recommend using constants of: $.log.LEVEL.TRACE to $.log.LEVEL.ERROR
   *                        can be string: 'TRACE', 'DEBUG', 'INFO', 'WARN' or 'ERROR'.
   *                        can be number between 0 (TRACE) to 4 (ERROR).
   */
  log.setLevel = function (newAllowedLevel) {
    if (isNaN(newAllowedLevel) && !isNaN(LEVEL[newAllowedLevel])) {
      allowedLevel = LEVEL[newAllowedLevel];
    } else if (LEVEL.TRACE <= newAllowedLevel && newAllowedLevel <= LEVEL.ERROR) {
      allowedLevel = newAllowedLevel;
    }
  };

  /**
   * The shortcut methods for logging.
   *
   * @type {Array}
   */
  var methods = ['trace', 'debug', 'info', 'warn', 'error'];

  for (var i = 0, len = methods.length; i < len; i++) {
    $[methods[i]] = $.fn[methods[i]] = (function (level) {
      return function () {
        if (LEVEL[level.toUpperCase()] >= allowedLevel) {
          var args = [].slice.call(arguments);
          args.splice(0, 0, level);
          return log.apply(this, args);
        }
      }
    })(methods[i]);
  }

  $.log = $.fn.log = log;
})(jQuery);