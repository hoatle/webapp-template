/**
 * HelloWorld test
 */

var should = require('should');

describe('Hello World', function() {
  it('ok', function() {

    var str = 'hello-world';

    'hello-world'.should.equal(str);
  });
});