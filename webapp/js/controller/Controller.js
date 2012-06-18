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
 * The Controller to be extended for concrete controller.
 */
define(
  [
    'jquery',
    'underscore',
    'backbone'
  ],
  function($, _, Backbone) {

    var Controller = function() {

    };

    //inherits from Backbone
    var extend = Backbone.Router.extend;

    //extends only static methods, static properties
    Controller.extend = function(opts) {
      return extend.call(Controller, {}, opts);
    };

    Controller = Controller.extend({ //static methods, fields only
      //action mapping between url action and method action
      actions: {

      },
      //the default action, should be overridden by controllers if there is no action matched.
      index: function(params) {
        $.log('Controller#index is not overridden with params: ' + params);
      }
    });

    return Controller;
  }
);