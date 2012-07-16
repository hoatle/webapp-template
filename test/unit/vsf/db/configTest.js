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

    var fullMongodbConfig = Config({
      type: Config.TYPE.MONGODB,
      username: 'root',
      password: 'awesome',
      address: 'localhost',
      port: 27017,
      dbName: 'watpl'
    });

    fullMongodbConfig.getType().should.equal('mongodb');
    fullMongodbConfig.getUsername().should.equal('root');
    fullMongodbConfig.getPassword().should.equal('awesome');
    fullMongodbConfig.getAddress().should.equal('localhost');
    fullMongodbConfig.getPort().should.equal(27017);
    fullMongodbConfig.getDbName().should.equal('watpl');
    fullMongodbConfig.getDbUrl().should.equal('mongodb://root:awesome@localhost:27017/watpl');

    var optionalMongodbConfig = Config({
      type: Config.TYPE.MONGODB,
      address: 'db.watpl.com',
      dbName: 'watpl'
    });

    optionalMongodbConfig.getType().should.equal('mongodb');
    should.not.exist(optionalMongodbConfig.getUsername());
    should.not.exist(optionalMongodbConfig.getPassword());
    optionalMongodbConfig.getAddress().should.equal('db.watpl.com');
    optionalMongodbConfig.getPort().should.equal(27017);
    optionalMongodbConfig.getDbName().should.equal('watpl');
    optionalMongodbConfig.getDbUrl().should.equal('mongodb://db.watpl.com:27017/watpl');

    var fullMySqlConfig = Config({
      type: Config.TYPE.MYSQL,
      username: 'root',
      password: 'awesome',
      address: 'mysql.watpl.com',
      port: 3306,
      dbName: 'watpl'
    });

    fullMySqlConfig.getType().should.equal('mysql');
    fullMySqlConfig.getUsername().should.equal('root');
    fullMySqlConfig.getPassword().should.equal('awesome');
    fullMySqlConfig.getAddress().should.equal('mysql.watpl.com');
    fullMySqlConfig.getPort().should.equal(3306);
    fullMySqlConfig.getDbName().should.equal('watpl');
    fullMySqlConfig.getDbUrl().should.equal('mysql://root:awesome@mysql.watpl.com:3306/watpl');

    var optionalMySqlConfig = Config({
      type: Config.TYPE.MYSQL,
      address: 'mysql.watpl.com',
      dbName: 'watpl'
    });

    optionalMySqlConfig.getType().should.equal('mysql');
    should.not.exist(optionalMySqlConfig.getUsername());
    should.not.exist(optionalMySqlConfig.getPassword());
    optionalMySqlConfig.getAddress().should.equal('mysql.watpl.com');
    optionalMySqlConfig.getPort().should.equal(3306);
    optionalMySqlConfig.getDbName().should.equal('watpl');
    optionalMySqlConfig.getDbUrl().should.equal('mysql://mysql.watpl.com:3306/watpl');
  });

  it('params.dbUrl', function() {
    var dbUrl = 'mongodb://root:awesome@localhost:27017/watpl';

    var config = Config({
      dbUrl: dbUrl
    });

    config.getType().should.equal('mongodb');
    config.getUsername().should.equal('root');
    config.getPassword().should.equal('awesome');
    config.getAddress().should.equal('localhost');
    config.getPort().should.equal(27017);
    config.getDbName().should.equal('watpl');
    config.getDbUrl().should.equal(dbUrl);

    var dbUrl2 = 'mysql://localhost:3306/watpl';

    var config2 = Config({
      dbUrl: dbUrl2
    });

    config2.getType().should.equal('mysql');
    should.not.exist(config2.getUsername());
    should.not.exist(config2.getPassword());
    config2.getAddress().should.equal('localhost');
    config2.getPort().should.equal(3306);
    config2.getDbName().should.equal('watpl');
    config2.getDbUrl().should.equal(dbUrl2);

    //not well-formed

    var dbUrl3 = 'mysql:/def:r45/abc';

    (function() {
      var config3 = Config({
        dbUrl: dbUrl3
      });
    }).should.throw(/^config.dbUrl format is not valid/);

  });
});