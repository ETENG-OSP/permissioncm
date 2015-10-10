var resourceController = require('../utils/resource-controller');
var Permission = require('../models').Permission;

var PermissionController = resourceController(Permission);

module.exports = PermissionController;
