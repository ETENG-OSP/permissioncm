var resourceController = require('../utils/resource-controller');
var models = require('../models');

var RoleController = resourceController(models.Role, {
  permissions: models.Permission,
  users: models.RoleUser
});

module.exports = RoleController;
