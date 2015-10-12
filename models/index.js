var sequelize = require('../sequelize');

var Permission = require('./permission')(sequelize);
var Platform = require('./platform')(sequelize);
var Role = require('./role')(sequelize);
var RoleUser = require('./role-user')(sequelize);
var User = require('./user')();

Role.belongsToMany(Permission, {through: 'permissions_roles'});
Role.hasMany(RoleUser);

Permission.belongsToMany(Role, {through: 'permissions_roles'});
Permission.belongsTo(Platform);
Permission.belongsTo(Permission, {as: 'parent', foreignKey: 'parentId'});
Permission.hasMany(Permission, {as: 'children', foreignKey: 'parentId'});

Platform.hasMany(Permission);

RoleUser.belongsTo(Role);

exports.Role = Role;
exports.User = User;
exports.RoleUser = RoleUser;
exports.Permission = Permission;
exports.Platform = Platform;
