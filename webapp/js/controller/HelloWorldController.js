/**
 * HelloWorld controller.
 */
define(
  [
    'underscore',
    'backbone',
    'controller/Controller',
    'view/HelloWorldView'
  ],
  function(_, Backbone, Controller, HelloWorldView) {

    var HelloWorldController = Controller.extend({

      index: function() {
        var helloWorldView = new HelloWorldView({
          $container: $('body')
        });
        helloWorldView.render();
      }
    });

    return HelloWorldController;
  }
);