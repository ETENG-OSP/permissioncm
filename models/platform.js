var Sequelize = require('sequelize');

module.exports = function(sequelize) {

  return sequelize.define('platform', {

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

  });

};
