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

  var LEVELS = {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
  };

  var allowedLevel = LEVELS.trace;

  var log = function (level, msg, obj) {
    if (window.console) {
      if (obj) {
        console.log("[%s] %s: %o", level.toUpperCase(), msg, obj);
      } else {
        console.log("[%s] %s",level.toUpperCase(), msg);
      }
    }
    return this;
  };

  log.setLevel = function(newAllowedLevel) {
    if (!isNaN(LEVELS[newAllowedLevel])) {
      allowedLevel = LEVELS[newAllowedLevel];
    }
  };

  var methods = ['trace', 'debug', 'info', 'warn', 'error'];

  for (var i = 0, len = methods.length; i < len; i++) {
    $[methods[i]] = $.fn[methods[i]] = (function(level) {
      return function() {
        if (LEVELS[level] >= allowedLevel) {
          var args = Array.prototype.slice.call(arguments);
          args.splice(0, 0, level);
          log.apply(this, args);
        }
      }
    })(methods[i]);
  }

  $.log = $.fn.log = log;
})(jQuery);