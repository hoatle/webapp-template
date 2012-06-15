/**
 * The HelloWorld view
 */

define(
  [
    'jquery',
    'underscore',
    'backbone',
    'view/BaseView',
    'hbs!template/HelloWorldTemplate'
  ],
  function($, _, Backbone, BaseView, template) {

    return BaseView.extend({
      template: template
    });

  }
);