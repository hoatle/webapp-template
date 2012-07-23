/**
 * Unit test for vsf.js
 */
$(document).ready(function() {
  module('vsf');

  test('APIs', function() {
    ok($.isFunction(vsf.provide), 'provide');
    ok($.isFunction(vsf.raiseRequiredImplementationError), 'raiseRequiredImplementationError');
    ok($.isFunction(vsf.require), 'require');
    ok($.isFunction(vsf.register), 'register');
  });

  test('provide', function() {
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