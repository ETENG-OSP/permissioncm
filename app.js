var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var swaggerTools = require('swagger-tools');
var errorhandler = require('errorhandler');

var nconf = require('./nconf');
var sequelize = require('./sequelize');
var swaggerObject = require('./api/swagger');
var security = require('./utils/security');

swaggerTools.initializeMiddleware(swaggerObject, function(middleware) {

  var securityOptions = {
    tokenName: nconf.get('security:tokenName'),
    id: nconf.get('feature:id'),
    secret: nconf.get('feature:secret')
  };

  var app = express();
  app.use(cors());

  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerUi());
  app.use(middleware.swaggerRouter());

  app.use(security(securityOptions));
  app.use(errorhandler());

  app.listen(3001, function() {
    console.log('start up');
  });

});
