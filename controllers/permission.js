var resourceController = require('../utils/resource-controller');
var models = require('../models');

var PermissionController = resourceController(models.Permission, {
  platform: models.Platform,
  roles: models.Role
});

module.exports = PermissionController;
