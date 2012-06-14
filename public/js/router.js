/**
 * The application router
 */

define(
  [
    'jquery',
    'underscore',
    'backbone',
    'views/ApplicationView'
  ],
  function ($, _, Backbone, ApplicationView) {

    var applicationView;

    var AppRouter = Backbone.Router.extend({
      routes: {
        '*actions': 'showDefault'
      },

      initialize: function (options) {

        applicationView = new ApplicationView({
          $container: $('body')
        });

      },

      showDefault: function () {
        applicationView.render();
      },


      //start the application
      start: function () {
        Backbone.history.start();
      }
    });

    return AppRouter;
  });