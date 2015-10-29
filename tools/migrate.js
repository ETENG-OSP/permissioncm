require('./create-db');
var models = require('./models');
var data = require('./permissionstore-2');

function addApplicationId(value) {
  value.applicationId = '2';
  return value
}

var permissions = data.data.permission.map(addApplicationId);

models.Permission.bulkCreate(permissions)
  .then(function() {
    return models.Role.bulkCreate(data.data.role.map(addApplicationId));
  })
  .then(function() {
    return models.Platform.bulkCreate(data.data.platform.map(addApplicationId));
  })
  .then(function() {
    return models.RoleUser.bulkCreate(data.data.role_users__user_roles.map(function(value) {
      return {
        userId: value.user_roles,
        roleId: value.role_users
      }
    }));
  })
  .then(function() {
    return Promise.all(data.data.permission_roles__role_permissions.map(function(value) {
      return models.Role.findOne({where: {id: value.role_permissions}})
        .then(function(role) {
          return role.addPermissions([value.permission_roles]);
        });
    }));
  })
  .then(function() {
    return Promise.all(data.data.permission.map(function(value) {
      return models.Permission.findOne({where: {id: value.id}}).then(function(permission) {
        permission.parentId = value.parent;
        permission.platformId = value.platform;
        return permission.save();
      });
    }));
  })
  .then(function() {
    console.log('ok');
  });
