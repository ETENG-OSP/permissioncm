var Promise = require('bluebird');
var faker = require('faker');

var sequelize = require('../sequelize');
var models = require('../models');

var Role = models.Role;
var Permission = models.Permission;
var User = models.User;

Promise.all([
  Permission.create({applicationId: '1'}),
  Permission.create({applicationId: '1'}),
  Permission.create({applicationId: '1'})
]).spread(function(p1, p2, p3) {

  return Role.create({
    permissions: [p1, p2, p3],
    applicationId: '1'
  });

}).then(function() {
  console.log('ok');
});
