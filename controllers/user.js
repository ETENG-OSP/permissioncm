var User = require('../models').User;
var Permission = require('../models').Permission;
var Role = require('../models').Role;
var query = require('../utils/query');

function getPermissions(req, res, next) {
  var userId = req.cm.param('id');
  var user = new User(userId);
  user
    .getPermissions({
      include: query.getInclude(req, Permission)
    })
    .then(function(permissions) {
      res.json(permissions);
    })
    .catch(next);
}

function getRoles(req, res, next) {
  var userId = req.cm.param('id');
  var user = new User(userId);
  user
    .getRoles({
      include: query.getInclude(req, Role)
    })
    .then(function(roles) {
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
