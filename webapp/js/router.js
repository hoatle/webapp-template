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
 * The application router
 */
define(
  [
    'underscore',
    'backbone',
    'controller/IndexController',
    'controller/DefaultController'
  ],
  function (_, Backbone, IndexController, DefaultController) {

    var Router = Backbone.Router.extend({
      /**
       * Controller mapping from controller name on url to controller name on 'controller' folder.
       *
       * For example: 'user' : 'UserController' => router will try to find module under: controller/UserController.
       */
      controllers: {

      },

      /**
       * Dynamically configures controller mapping.
       *
       * This will override any previously defined controller.
       *
       * @param urlController the url controller name
       * @param controllerFileName the accordingly controller file name
       */
      setController: function(urlController, controllerFileName) {
        if (this.controllers[urlController]) {
          $.log('Router#setController: override ' + this.controllers[urlController]);
        }
        this.controllers[urlController] = controllerFileName;
      },

      /**
       * Dispatches to another controller by specifying urlController, optional action and optional params.
       *
       * @param urlController the url controller
       * @param options optional options which is the same as for router#route(fragment, opts) with 2 optional more params:
       *                action, params for constructing url fragment.
       */
      dispatch: function(urlController, options) {
        var fragment = _getRouteFragment.call(this, urlController, options['action'], options['params']);
        this.navigate(fragment, options);
      },

      routes: {
        //TODO should have optional mapping like this instead of 3 mappings
        //':controller?/:action??/:params?' : 'dispatchController'
        //or
        //':controller[/:action][/:params]' : 'dispatchController'
        ':controller': 'dispatchController',
        ':controller/:action': 'dispatchController',
        ':controller/:action/*params': 'dispatchController',
        '*actions': 'indexController'
      },

      initialize: function (options) {

      },

      dispatchController: function(controller, action, params) {
        $.log('dispatchController', controller);
        var controllerName = this.controllers[controller];

        if (!controllerName) {
          this.defaultController(_getRouteFragment.call(this, controller, action, params));
          return;
        }
        var self = this;
        require(
          [
            'controller/' + controllerName
          ], function(Controller) {
            if (action) {
              if ($.isFunction(Controller[action])) {
                Controller[action](params);
                return;
              }
            }
            //default action
            Controller.index();
          }, function(err) { //not found matching controller
            $.log('AppRouter#dispatchController: Error for loading controller: ' + controller, err);
            self.defaultController(_getRouteFragment.call(self, controller, action, params));
          }
        );
      },

      defaultController: function(params) {
        DefaultController.index(params);
      },

      indexController: function(params) {
        IndexController.index(params);
      },


      //start the application
      start: function () {
        Backbone.history.start();
      }
    });

    function _getRouteFragment(controller, action, params) {
      var routeFragment = controller;
      if (action) {
        routeFragment += '/' + action;
      }
      if (params) {
        routeFragment += '/' + params;
      }
      return routeFragment;
    }

    return Router;
  });