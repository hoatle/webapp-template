/**
 * The logger interface
 */

(function(vsf) {

  var Logger = function() {

  };


  Logger.prototype = {
    isTraceEnabled: function() {
      vsf.raiseRequiredImplementationError('Logger#isTraceEnabled');
    },

    trace: function(msg, throwable) {
      vsf.raiseRequiredImplementationError('Logger#trace');
    },

    isDebugEnabled: function() {
      vsf.raiseRequiredImplementationError('Logger#isDebugEnabled');
    },
    debug: function(msg, throwable) {
      vsf.raiseRequiredImplementationError('Logger#debug');
    },
    isInfoEnabled: function() {
      vsf.raiseRequiredImplementationError('Logger#isInfoEnabled');
    },
    info: function(msg, throwable) {
      vsf.raiseRequiredImplementationError('Logger#info');
    },
    isWarnEnabled: function() {
      vsf.raiseRequiredImplementationError('Logger#isWarnEnabled');
    },
    warn: function(msg, throwable) {
      vsf.raiseRequiredImplementationError('Logger#warn');
    },
    isErrorEnabled: function() {
      vsf.raiseRequiredImplementationError('Logger#isErrorEnabled');
    },
    error: function(msg, throwable) {
      vsf.raiseRequiredImplementationError('Logger#error');
    }
  };


  vsf.export('vsf.log.Logger', Logger);

}).call(this, vsf);