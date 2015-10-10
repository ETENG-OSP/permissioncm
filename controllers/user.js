var User = require('../models').User;

function getPermissions(req, res, next) {

  var userId = req.getParam('id');

  var user = new User(userId);

  user
    .getPermissions()
    .then(function(permissions) {
      res.json(permissions);
    })
    .catch(next);

}

function update(req, res, next) {

  var userId = req.getParam('id');
  var roleIds = req.getParam('roleIds');

  var user = new User(userId);

  user
    .setRoles(roleIds)
    .then(function() {
      res.json();
    })
    .catch(next);

}

exports.getPermissions = getPermissions;
exports.update = update;
