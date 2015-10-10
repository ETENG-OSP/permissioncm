var Promise = require('bluebird');
var faker = require('faker');

var sequelize = require('../sequelize');
var models = require('../models');

var Role = models.Role;
var Permission = models.Permission;
var User = models.User;

Permission
  .create({applicationId: '1'})
  .then(function(entity) {
    return Permission.findOne({where: {id: entity.id}});
  })
  .then(function(permission) {
    permission.url = 'aaaa';
    permission.setParent(permission.id);
    return permission.save();
  })
  .then(console.log);
