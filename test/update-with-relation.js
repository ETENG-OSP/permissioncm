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
  Permission.create({applicationId: '1'}),
  Role.create({applicationId: '1'})
]).spread(function(p1, p2, p3, r) {

  return Role.update({
    permissions: [p1, p2, p3]
  }, {
    where: {id: r.id},
    include: Permission
  });

}).then(function() {
  console.log('ok');
});
