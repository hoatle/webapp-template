/**
 * Unit test for vsf.db.config
 */
var should = require('should'),
  vsf = require('../common').getVSF(),
  Config = vsf.require('/lib/vsf/db/config');

describe('vsf.db.config', function() {
  it('APIs', function() {
    Config.should.be.a('function');

    var config = Config({});
    config.should.be.a('object');

    config.getType.should.be.a('function');
    config.getUsername.should.be.a('function');
    config.getPassword.should.be.a('function');
    config.getAddress.should.be.a('function');
    config.getPort.should.be.a('function');
    config.getDbName.should.be.a('function');
  });

  it('params', function() {

    var fullConfig = Config({
      type: Config.TYPE.MONGODB,
      username: 'root',
      password: 'awesome',
      address: 'localhost',
      port: 27017,
      dbName: 'watpl'
    });

    fullConfig.getType().should.equal('mongodb');
    fullConfig.getUsername().should.equal('root');
    fullConfig.getPassword().should.equal('awesome');
    fullConfig.getAddress().should.equal('localhost');
    fullConfig.getPort().should.equal(27017);
    fullConfig.getDbName().should.equal('watpl');
    fullConfig.getDbString().should.equal('mongodb://root:awesome@localhost:27017/watpl');

  });
});