/**
 * The Controller to be extended for concrete controller.
 */

define(
  [
    'underscore',
    'backbone'
  ],
  function(_, Backbone) {

    var Controller = {
      extend: function(opts) {
        _.extend(this, opts);
        return this;
      }
    };

    return Controller;
  }
);