var resourceController = require('../utils/resource-controller');
var Permission = require('../models').Permission;
var Platform = require('../models').Platform;

var PermissionController = resourceController(Permission, {
  platform: Platform
});

module.exports = PermissionController;
