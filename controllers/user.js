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

  user
    .getRoles()
    .then(function(roles) {
      res.json(roles);
    })
    .catch(next);

}

function update(req, res, next) {

  var userId = req.cm.param('id');
  var roleIds = req.cm.param('roleIds');

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
exports.update = update;
