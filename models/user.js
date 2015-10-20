var _ = require('underscore');

module.exports = function() {

  function User(id) {
    this.id = id;
  }

  User.prototype.setRoles = function(roleIds) {

    var id = this.id;
    var RoleUser = require('./index').RoleUser;
    return RoleUser.destroy({
      where: {userId: id}
    }).then(function() {
      return RoleUser.bulkCreate(roleIds.map(function(roleId) {
        return {
          userId: id,
          roleId: roleId
        };
      }));
    });

  };

  User.prototype.getRoles = function(options) {

    var id = this.id;
    var RoleUser = require('./index').RoleUser;
    var Role = require('./index').Role;

    return RoleUser.findAll({
      where: {userId: id},
      include: [
        {
          model: Role,
          include: options.include
        }
      ]
    }).then(function(roleUsers) {
      return roleUsers.map(function(roleUser) {
        return roleUser.role;
      });
    });

  };

  User.prototype.getPermissions = function(options) {

    var id = this.id;
    var RoleUser = require('./index').RoleUser;
    var Permission = require('./index').Permission;
    var Role = require('./index').Role;

    return RoleUser.findAll({
      where: {userId: id},
      include: [
        {
          model: Role,
          include: {
            model: Permission,
            include: options.include
          }
        }
      ]
    }).then(function(roleUsers) {
      var permissionSet = roleUsers.reduce(function(memo, roleUser) {
        roleUser.role.permissions.forEach(function(permission) {
          memo[permission.id] = permission;
        });
        return memo;
      }, {});
      var permissionArray = _.toArray(permissionSet);
      return permissionArray;
    });

  };

  return User;

};
