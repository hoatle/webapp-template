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
    'jquery',
    'underscore',
    'backbone',
    'controller/IndexController',
    'controller/DefaultController'
  ],
  function ($, _, Backbone, IndexController, DefaultController) {

    var indexController,
      defaultController;

    /**
     * Holds controller instance for caching purpose.
     *
     * @type {Object}
     */
    var cachedControllers = {

    };

    /**
     * Holds controller instance navigation stack for detecting back/forward button and workflow.
     * By default, the stack hold 10 controller instances.
     * This is configurable via new Router({maxNavigationRouteStackLength:Number}); option.
     * To disable this facility, set maxNavigationRouteStackLength any value < 1
     */
    var navigationRouteStack = [];

    function addToNavigationStack(controllerInstance) {
      var maxNavigationRouteStackLength = this.options.maxNavigationRouteStackLength;

      //allow to disable
      if (maxNavigationRouteStackLength < 1) {
        return;
      }

      if (navigationRouteStack.length < (maxNavigationRouteStackLength || 10)) {
        navigationRouteStack.push(controllerInstance);
      } else {
        navigationRouteStack.shift(controllerInstance);
        navigationRouteStack.push(controllerInstance);
      }

    }

    return Backbone.Router.extend({
      /**
       * Controller mapping from controller name on url to controller name on 'controller' folder.
       *
       * For example: 'user' : 'User' => router will try to find module under: controller/UserController.
       */
      controllers: {

      },

      /**
       * Dynamically configures controller mapping.
       *
       * This will override any previously defined controller.
       *
       * @param urlController the url controller name
       * @param controllerName the accordingly controller name
       */
      setController: function(urlController, controllerName) {
        if (this.controllers[urlController]) {
          $.warn('Router#setController: override ' + this.controllers[urlController]);
        }
        this.controllers[urlController] = controllerName;
      },

      /**
       * Dispatches to another controller by specifying urlController, optional action and optional params.
       *
       * @param urlController the url controller
       * @param options optional options which is the same as for router#route(fragment, opts) with 2 optional more params:
       *                action, params for constructing url fragment.
       */
      dispatch: function(urlController, options) {
        if (!urlController) {
          $.warn('Router#dispatch: not valid urlController', urlController);
          return;
        }
        options = options || {};
        var fragment = _getRouteFragment.call(this, urlController, options.action, options.params);
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
        this.options = options || {};
      },

      dispatchController: function(controller, action, params) {
        var controllerName = this.controllers[controller];

        if (!controllerName) {
          controllerName = controller;
        }
        controllerName += 'Controller';

        //if controllerName is not configured, try to find it with url controller
        //this is useful to introduce convention over configuration
        var self = this;

        var cachedControllerInstance = cachedControllers[controllerName];

        if (cachedControllerInstance) {

          processController.call(this, cachedControllerInstance);

        } else {

          require(
            [
              'controller/' + controllerName
            ], function(Controller) {
              var controllerInstance = new Controller({
                name: controllerName,
                router: self
              });
              cachedControllers[controllerName] = controllerInstance;

              processController.call(self, controllerInstance);

            }, function(err) { //not found matching controller
              $.warn('AppRouter#dispatchController: Error for loading controller: ' + controller, err);
              self.defaultController(_getRouteFragment.call(self, controller, action, params));
            }
          );

        }

        function processController(controllerInstance) {

          addToNavigationStack.call(this, controllerInstance);

          if (action) {
            var methodAction = controllerInstance.actions[action];
            if (methodAction && $.isFunction(controllerInstance[methodAction])) {
              controllerInstance[methodAction](params);
            } else if ($.isFunction(methodAction)) {
              methodAction.call(controllerInstance, params);
            } else if ($.isFunction(controllerInstance[action])) { //convention over configuration
              controllerInstance[action](params);
            } else { //there is no-matched action, call default action
              params = params ? action + '/' + params : action;
              controllerInstance.index(params);
            }
          } else {
            //default action
            controllerInstance.index();
          }
        }
      },

      defaultController: function(params) {
        if (!defaultController) {
          defaultController = new DefaultController({
            name: 'DefaultController',
            router: this
          });
        }
        addToNavigationStack.call(this, defaultController);
        defaultController.index(params);
      },

      indexController: function(params) {
        if (!indexController) {
          indexController = new IndexController({
            name: 'IndexController',
            router: this
          });
        }
        addToNavigationStack.call(this, indexController);
        indexController.index(params);
      },

      /**
       * Gets the navigation route stack.
       * This could be used for work flow determination
       *
       * @return {Array}
       */
      getNavigationRouteStack: function() {
        return navigationRouteStack;
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

  });