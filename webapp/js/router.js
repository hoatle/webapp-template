/**
 * The application router
 */

define(
  [
    'jquery',
    'underscore',
    'backbone',
    'controller/HelloWorldController'
  ],
  function ($, _, Backbone, HelloWorldController) {

    var applicationView;

    var AppRouter = Backbone.Router.extend({
      routes: {
        '*actions': 'showDefault'
      },

      initialize: function (options) {

      },

      showDefault: function () {
        HelloWorldController.index();
      },


      //start the application
      start: function () {
        Backbone.history.start();
      }
    });

    return AppRouter;
  });