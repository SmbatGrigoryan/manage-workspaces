'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.userId = this.belongsTo(models.user)
      // this.userId = this.belongsTo(models.User)

      Workspace.belongsTo(models.User)
    }
  };
  Workspace.init({
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    subDomain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Workspace',
  });
  return Workspace;
};
