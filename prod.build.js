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
  appDir: "./webapp/js",
  baseUrl: "./",
  dir: "./public/js",
  modules: [
    {
      name: "main",
      exclude: ["json2", "underscore", "backbone", "handlebars"] //exclude shim's modules
    }
  ],
  locale: "en-us",
  optimize: "uglify",
  optimizeCss: "standard",
  inlineText: true,
  //If using UglifyJS for script optimization, these config options can be
  //used to pass configuration values to UglifyJS.
  //See https://github.com/mishoo/UglifyJS for the possible values.
  uglify: {
    toplevel: true,
    ascii_only: true,
    beautify: false,
    max_line_length: 1000
  },
  preserveLicenseComments: false, //TODO is this compliant with licences?

  findNestedDependencies: true
})
