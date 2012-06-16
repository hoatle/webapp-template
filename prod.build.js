//compile application for production running

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
      name: "main"
    }
  ]
})
