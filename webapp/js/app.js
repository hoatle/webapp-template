/**
 * The application entry point
 */

define(['router'], function(Router) {

  function initialize() {
    var router = new Router({
      //options here
    });
    router.start();
  }

  return {
    initialize: initialize
  }
});