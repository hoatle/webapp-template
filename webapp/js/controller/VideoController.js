/**
 * Video controller.
 */
define(
  [
    'underscore',
    'backbone',
    'controller/Controller',
    'view/VideoView'
  ],
  function(_, Backbone, Controller, VideoView) {

    var VideoController = Controller.extend({

      index: function(params) {
        var videoView = new VideoView({
          $container: $('body')
        });
        videoView.render();
      },

      display: function(params) {

      }

    });

    return VideoController;
  }
);