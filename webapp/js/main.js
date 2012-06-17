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

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    'text': 'lib/require/plugins/text-2.0.0',
    'handlebars': 'lib/handlebars/handlebars-1.0.0.beta.6',
    'hbs': 'lib/require/plugins/hbs-0.2.1',
    'json2': 'lib/json/json2',
    'jquery': 'lib/jquery/jquery-1.7.1',
    'underscore': 'lib/underscore/underscore-1.3.3',
    'backbone': 'lib/backbone/backbone-0.9.2',
    'bootstrap': 'lib/bootstrap/bootstrap-2.0.4',
    'jquery.log': 'lib/jquery/plugins/jquery.log-1.0.0'
  },

  hbs: {
    disableI18n: true,        // This disables the i18n helper and
    // doesn't require the json i18n files (e.g. en_us.json)
    // (false by default)

    disableHelpers: true,     // When true, won't look for and try to automatically load
    // helpers (false by default)

    helperPathCallback:       // Callback to determine the path to look for helpers
      function (name) {       // ('/template/helpers/'+name by default)
        return 'cs!' + name;
      },

    templateExtension: "html" // Set the extension automatically appended to templates
    // ('hbs' by default)
  },

  shim: {

    json2: {
      exports: 'JSON'
    },

    underscore: {
      exports: '_'
    },

    backbone: {
      deps:
        [
          'underscore',
          'jquery'
        ],
      exports: 'Backbone'
    },

    handlebars: {
      exports: 'Handlebars'
    },

    //jquery plugins
    'bootstrap': ['jquery'],

    'jquery.log': {
      deps: ['jquery'],
      exports: 'jQuery.fn.log'
    }
  }

});

//load jquery plugins //TODO this is a bit ugly
require(
  [
    'jquery',
    'bootstrap',
    'jquery.log'
  ],
  function($) {

    //boot the application

    require(['app'], function(app) {
      app.initialize();
    });
  }
);






