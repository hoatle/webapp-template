/**
 * jQuery log plugin.
 */
(function($) {
  var log = function (msg, obj) {
    if (window.console) {
      if (obj) {
        console.log("%s: %o", msg, obj);
      } else {
        console.log(msg);
      }
    }
    return this;
  };
  $.log = $.fn.log = log;
})(jQuery);