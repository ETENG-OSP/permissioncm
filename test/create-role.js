var Promise = require('bluebird');
var faker = require('faker');

var sequelize = require('../sequelize');
var models = require('../models');

var Role = models.Role;
var Permission = models.Permission;
var User = models.User;

Promise.all([
  Role.create({applicationId: '1'}),
  Role.create({applicationId: '1'}),
  Role.create({applicationId: '1'}),
  Permission.create({applicationId: '1'}),
  Permission.create({applicationId: '1'}),
  Permission.create({applicationId: '1'})
]).spread(function(role1, role2, role3, permission1, permission2, permission3) {

  var user = new User(faker.internet.userName());
  return user
    .setRoles([role1.id, role2.id, role3.id])
    .then(function() {
      return Promise.all([
        role1.setPermissions([permission1.id, permission2.id]),
        role2.setPermissions([permission3.id, permission2.id])
      ]);
    });
}).then(function(results) {
  var user = new User('tester');
  return user.getPermissions();
}).then(function(results) {
  results.map(function(permission) {
    console.log(permission.toJSON());
  });
});
