/**
 * The HelloWorld view
 */

define(
  [
    'jquery',
    'underscore',
    'backbone',
    'view/BaseView',
    'text!../template/HelloWorldTemplate.html'
  ],
  function($, _, Backbone, BaseView, textTemplate) {

    return BaseView.extend({
      textTemplate: textTemplate
    });
  }
);