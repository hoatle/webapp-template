/**
 * The BaseView to be extended by concrete views.
 *
 * @author hoatle
 */

define(
  [
    'jquery',
    'underscore',
    'backbone'
  ],
  function($, _, Backbone) {

    return Backbone.View.extend({

      /**
       * The pre-initialize phase for override
       *
       * @param options
       * @return {*}
       */
      beforeInitialize: function(options) {
        return this
      },

      /**
       * Initializes the view.
       *
       * @param options the options literal object, usually have: $container, model and appendable attribute.
       */
      initialize: function(options) {

        this.beforeInitialize.apply(this, arguments);

        _.bind(_ensureValid, this);

        this.$container = options['$container'];
        this.model = options['model'] || this.model;
        this.appendable = options['appendable'];

        if (this.template) {
          this.setElement(this.template(this.model));
        }
        this.afterInitialize.apply(this, arguments)
      },

      /**
       * The after-initialize phase for override
       *
       * @param options
       * @return {*}
       */
      afterInitialize: function(options) {
        return this;
      },

      /**
       * The pre render phase for override
       *
       * @return {*}
       */
      beforeRender: function() {
        return this;
      },

      container: function(){
        return _.isString(this.$container) ? this.$(this.$container) : this.$container;
      },

      /**
       * Renders the view
       *
       * @return {*}
       */
      render: function() {
        this.beforeRender();

        if (_ensureValid()) {
          var c = this.container();
          if (this.appendable) {
            c.append(this.$el);
          } else {
            c.html(this.$el);
          }
          this.delegateEvents();
        }

        this.afterRender();

        return this
      },

      /**
       * The after render phase for override
       *
       * @return {*}
       */
      afterRender: function() {
        return this;
      },

      update: function(model) {
        this.$el.html(this.template(model));
      },

      /**
       * Destroy this view
       * //TODO make sure no memory leak for event handling
       */
      destroy: function() {
        this.$el.remove();
      }

    });

    function _ensureValid() {
      if (_.isNull(this.$container) || _.isNull(this.el)) {
        $.log('this.$container or this.el is null, invalid state');
        return false
      }
      return true;
    }

  }
);