const { model } = require("../db");

module.exports = function(sequelize, DataTypes){
    return sequelize.define('logtestdata', {
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        definition: {
          type: DataTypes.STRING,
          allowNull: false
        },
        result: {
          type: DataTypes.STRING,
          allowNull: false
        },
        owner_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
  })
}