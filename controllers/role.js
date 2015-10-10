var resourceController = require('../utils/resource-controller');
var Role = require('../models').Role;

var RoleController = resourceController(Role);

module.exports = RoleController;
