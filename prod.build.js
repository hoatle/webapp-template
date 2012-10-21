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

//compile application for production running
//See all possible options here: https://github.com/jrburke/r.js/blob/master/build/example.build.js

({
  paths: {
    'domReady': 'lib/require/plugins/domReady-2.0.1',
    'text': 'lib/require/plugins/text-2.0.3',
    'handlebars': 'lib/handlebars/handlebars-1.0.rc.1',
    'json2': 'lib/json/json2',
    'jquery': 'lib/jquery/jquery-1.7.1',
    'underscore': 'lib/underscore/underscore-1.4.2',
    'backbone': 'lib/backbone/backbone-0.9.2',
    'Backbone.ModelBinder': 'lib/backbone/plugins/Backbone.ModelBinder-0.1.5',
    'bootstrap': 'lib/jquery/plugins/bootstrap-2.1.1',
    'jquery.log': 'lib/jquery/plugins/jquery.log-0.1.0'
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

    'Backbone.ModelBinder': {
      deps: ['backbone'],
      exports: 'Backbone.ModelBinder'
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
  },
  appDir: "./webapp",
  baseUrl: "./js",
  dir: "./public",
  has: {
    prod: true //production mode, see more at: http://requirejs.org/docs/optimization.html#hasjs
  },
  modules: [
    {
      name: "main",
      //include dynamic controller here for included into main
      include: [
        'controller/HelloWorldController',
        'controller/UserController'
      ]
    }
  ],
  locale: "en-us",
  optimize: "uglify",

  //Allow CSS optimizations. Allowed values:
  //- "standard": @import inlining, comment removal and line returns.
  //Removing line returns may have problems in IE, depending on the type
  //of CSS.
  //- "standard.keepLines": like "standard" but keeps line returns.
  //- "none": skip CSS optimizations.
  //- "standard.keepComments": keeps the file comments, but removes line
  //returns.  (r.js 1.0.8+)
  //- "standard.keepComments.keepLines": keeps the file comments and line
  //returns. (r.js 1.0.8+)
  optimizeCss: "standard",

  inlineText: true,
  //If using UglifyJS for script optimization, these config options can be
  //used to pass configuration values to UglifyJS.
  //See https://github.com/mishoo/UglifyJS for the possible values.
  uglify: {
    //toplevel: true, //See problem: https://github.com/hoatle/webapp-template/issues/27
    ascii_only: true,
    beautify: false,
    max_line_length: 10000
  },
  preserveLicenseComments: false, //TODO is this compliant with licences?

  findNestedDependencies: true,
  removeCombined: true //bug: https://github.com/jrburke/r.js/issues/193 //resolved on 2.0.4
})
