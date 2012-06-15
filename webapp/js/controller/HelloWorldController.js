/**
 * HelloWorld controller.
 */
define(
  [
    'underscore',
    'backbone',
    'controller/BaseController',
    'view/HelloWorldView'
  ],
  function(_, Backbone, BaseController, HelloWorldView) {

    var HelloWorldController = _.extend(BaseController, {

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