var Promise = require('bluebird');
var faker = require('faker');

var sequelize = require('../sequelize');
var models = require('../models');

var Role = models.Role;
var Permission = models.Permission;
var User = models.User;

var p1, p2;

Promise.all([
  Permission.create({applicationId: '1'}),
  Permission.create({applicationId: '1'})
]).spread(function(_p1, _p2) {
  p1 = _p1;
  p2 = _p2;
  return p1.setParent(p2);
}).then(function() {
  return Permission.findOne({where: {id: p1.id}});
}).then(function(entity) {

  console.log(entity.toJSON());

});
