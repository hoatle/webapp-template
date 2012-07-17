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
(function($) {

  /**
   * All supported log levels.
   *
   * @type {Object}
   */
  var LEVELS = {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
  };

  /**
   * The default log level is 'trace'.
   *
   * @type {Number}
   */
  var allowedLevel = LEVELS.trace;

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
   * Sets the log level for logging or not.
   * By default, all levels are logged.
   * On production mode, need to change it to higher level, recommended: $.log.setLevel('info');
   *
   * @param newAllowedLevel
   */
  log.setLevel = function(newAllowedLevel) {
    if (!isNaN(LEVELS[newAllowedLevel])) {
      allowedLevel = LEVELS[newAllowedLevel];
    }
  };

  /**
   * The shortcut methods for logging.
   *
   * @type {Array}
   */
  var methods = ['trace', 'debug', 'info', 'warn', 'error'];

  for (var i = 0, len = methods.length; i < len; i++) {
    $[methods[i]] = $.fn[methods[i]] = (function(level) {
      return function() {
        if (LEVELS[level] >= allowedLevel) {
          var args = Array.prototype.slice.call(arguments);
          args.splice(0, 0, level);
          return log.apply(this, args);
        }
      }
    })(methods[i]);
  }

  $.log = $.fn.log = log;
})(jQuery);