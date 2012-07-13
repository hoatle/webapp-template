/**
 * Unit test for vsf
 */

var should = require('should'),
  vsf = require('../../../lib/vsf');

describe('vsf', function() {

  it('APIs', function() {
    vsf.appDir.should.be.a('function');
    vsf.require.should.be.a('function');
  });

  it('appDir', function() {
    should.exist(vsf.appDir());
  });

  it('require', function() {
    var normalEnvironment = require('../../../lib/vsf/environment'),
      requireEnvironment = vsf.require('/lib/vsf/environment');

    should.equal(requireEnvironment, normalEnvironment);
  });

});