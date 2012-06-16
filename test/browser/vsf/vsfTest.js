/**
 * Unit test for vsf.js
 */
$(document).ready(function() {
  module('vsf');

  test('APIs', function() {
    ok($.isFunction(vsf.export), 'export');
    ok($.isFunction(vsf.raiseRequiredImplementationError), 'raiseRequiredImplementationError');
    ok($.isFunction(vsf.require), 'require');
    ok($.isFunction(vsf.register), 'register');
  });

  test('export', function() {
    ok(true);
  });

  test('raiseRequiredImplementationError', function() {
    ok(true);
  });

  test('require', function() {
    ok(true);
  });

  test('register', function() {
    ok(true);
  });

});