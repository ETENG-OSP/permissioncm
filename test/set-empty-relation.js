var Promise = require('bluebird');
var faker = require('faker');

var sequelize = require('../sequelize');
var models = require('../models');

var Role = models.Role;
var Permission = models.Permission;
var User = models.User;

Promise.all([
  Permission.create({applicationId: 'test'}),
  Role.create({applicationId: 'test'})
]).spread(function(permission, role) {

  return permission.setRoles();

}).then(function() {
  console.log('ok');
});
