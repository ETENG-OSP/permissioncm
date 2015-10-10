var Sequelize = require('sequelize');

module.exports = function(sequelize) {

  return sequelize.define('role', {

    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },

    code: {
      type: Sequelize.STRING,
      unique: true
    },

    applicationId: {
      type: Sequelize.STRING,
      allowNull: false
    },

    name: Sequelize.STRING

  }, {

    instanceMethod: {

      setUsers: function(userIds) {
        var self = this;
        var RoleUser = require('./index').RoleUser;

        return RoleUser.destroy({
          where: {roleId: this.id}
        }).then(function() {
          return RoleUser.bulkCreate(userIds.map(function(userId) {
            return {
              roleId: self.id,
              userId: userId
            };
          }));
        });
      },

      getUsers: function() {
        return this
          .getRoleUsers()
          .then(function(roleUsers) {
            return roleUsers
              .map(function(roleUser) {
                return roleUser.userId;
              });
          });
      }

    }

  });

};
