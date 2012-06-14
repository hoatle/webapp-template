// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    'text': 'libs/require/plugins/text-2.0.0',
    'Handlebars': 'libs/handlebars/handlebars-1.0.0.beta.6',
    'Handlebars/i18nprecompile': 'libs/handlebars/i18nprecompile',
    'hbs': 'libs/require/plugins/hbs-0.2.1',
    'json2': 'libs/json/json2',
    'jquery': 'libs/jquery/jquery-1.7.1',
    'underscore': 'libs/underscore/underscore-1.3.3',
    'backbone': 'libs/backbone/backbone-0.9.2',
    'bootstrap': 'libs/bootstrap/bootstrap-2.0.4',
    'jquery.log': 'libs/jquery/plugins/jquery.log-1.0.0'
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

    Handlebars: {
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






