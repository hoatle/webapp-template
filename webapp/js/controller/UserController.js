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
 * User controller here for the purpose of demonstrating convention controller mapping.
 */
define(
  [
    'jquery',
    'underscore',
    'backbone',
    'controller/Controller',
    'view/UserView'
  ],
  function($, _, Backbone, Controller, UserView) {

    var userView;

    return Controller.extend({

      initialize: function() {
        userView = new UserView({
          $container: $('.watpl-container')
        });

        //Registers a url action with a string as action method of controller instance.
        this.action('show', 'showUser');

        //Registers a url action with a function to be run under controller instance context.
        this.action('update', function(params) {
          alert('update user: ' + params);
        });

      },

      index: function(params) {
        userView.render();
      },

      notify: function(params) {
        alert('notify action from UserController!');
      },

      showUser: function(params) {
        alert('show user: ' + params);
      }
    });
  }
);