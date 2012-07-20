/*
 * Copyright (C) hoatle
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
      textTemplate: textTemplate,
      afterRender: function() {

        this.modelBinder.bind(this.model, this.$el);

        this.$('#name').on('keyup', $.proxy(function(e) {
          var $el = $(e.target), val = $el.val();

          if (val !== $el.data('val')) {
            this.model.set('name', val);
            $el.data('val', val);
          }

        }, this));

      }
    });
  }
);