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
 * HelloWorld controller.
 */
define(
  [
    'jquery',
    'underscore',
    'backbone',
    'controller/Controller',
    'view/HelloWorldView'
  ],
  function($, _, Backbone, Controller, HelloWorldView) {

    return Controller.extend({

      index: function() {
        var helloWorldView = new HelloWorldView({
          $container: $('.watpl-container'),
          model: new Backbone.Model({
            name: 'World'
          })
        });
        helloWorldView.render();
      }
    });

  }
);