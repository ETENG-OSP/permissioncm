var User = require('../models').User;

function getPermissions(req, res, next) {

  var userId = req.cm.param('id');

  var user = new User(userId);

  user
    .getPermissions()
    .then(function(permissions) {
      res.json(permissions);
    })
    .catch(next);

}

function getRoles(req, res, next) {

  var userId = req.cm.param('id');

  var user = new User(userId);

  console.log('=== get roles', userId);

  user
    .getRoles()
    .then(function(roles) {
      console.log('=== results', roles);
      res.json(roles);
    })
    .catch(next);

}

function setRoles(req, res, next) {

  var userId = req.cm.param('id');
  var roleIds = req.cm.param('data').roles;

  var user = new User(userId);

  user
    .setRoles(roleIds)
    .then(function() {
      res.json();
    })
    .catch(next);

}

exports.getPermissions = getPermissions;
exports.getRoles = getRoles;
exports.setRoles = setRoles;
