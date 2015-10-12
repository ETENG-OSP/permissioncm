var Promise = require('bluebird');
var faker = require('faker');

var sequelize = require('../sequelize');
var models = require('../models');

var Role = models.Role;
var Permission = models.Permission;
var User = models.User;

Permission.findAll({
  include: [
    {model: Role}
  ]
}).then(function(entities) {

  entities.map(function(entity) {
    console.log(entity.toJSON());
  });

});
