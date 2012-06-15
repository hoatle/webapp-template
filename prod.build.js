// this is used to compile everything down in production, so stuff loads fast!
({
  appDir: "./webapp/js/",
  baseUrl: "./",
  locale: "en-us",
  optimize: "uglify",
  optimizeCss: "standard",
  inlineText: true,
  dir: "./public/js/",

  pragmasOnSave: {
    //removes Handlebars.Parser code (used to compile template strings)
    //set it to `false` if you need template strings even after build
    excludeHbsParser : true,
    // kills the entire plugin set once it's built.
    excludeHbs: false,
    //removes i18n precompiler
    excludeAfterBuild: false
  },

  mainConfigFile: "./webapp/js/main.js",

  modules: [
    {
      name: "main"
    }
  ],

  findNestedDependencies: true
})
