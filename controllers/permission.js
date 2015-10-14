var resourceController = require('../utils/resource-controller');
var models = require('../models');

var PermissionController = resourceController(models.Permission, {
  roles: models.Role
});

module.exports = PermissionController;
