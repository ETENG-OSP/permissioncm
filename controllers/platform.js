var resourceController = require('../utils/resource-controller');
var Platform = require('../models').Platform;

var PlatformController = resourceController(Platform);

module.exports = PlatformController;
