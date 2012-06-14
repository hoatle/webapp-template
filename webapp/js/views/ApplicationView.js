/**
 * The entry-point application view
 */

define(
  [
    'jquery',
    'underscore',
    'backbone',
    'views/BaseView',
    'hbs!templates/ApplicationTemplate'
  ],
  function($, _, Backbone, BaseView, applicationTemplate) {

    return BaseView.extend({
      template: applicationTemplate
    });

  }
);