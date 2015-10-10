var Sequelize = require('sequelize');

module.exports = function(sequelize) {

  return sequelize.define('permission', {

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

    name: Sequelize.STRING,

    url: Sequelize.STRING,

    meta: Sequelize.JSON

  });

};
