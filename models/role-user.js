var Sequelize = require('sequelize');

module.exports = function(sequelize) {

  return sequelize.define('roles_users', {
    userId: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

};
