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

    description: Sequelize.TEXT,

    meta: {
      type: Sequelize.TEXT,
      get: function() {
        try {
          var result = JSON.parse(this.getDataValue('meta'));
          return result;
        } catch (err) {
          return;
        }
      },
      set: function(val) {
        try {
          return this.setDataValue('meta', JSON.stringify(val));
        } catch (err) {
          return;
        }
      }
    }

  });

};
