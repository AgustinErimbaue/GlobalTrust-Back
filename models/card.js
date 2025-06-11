'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Card.belongsTo(models.User, { foreignKey: 'userId' });
      Card.belongsTo(models.Account, { foreignKey: 'accountId' });
    }
  }
  Card.init({
    number: DataTypes.STRING,
    cvv: DataTypes.STRING,
    expirationDate: DataTypes.DATE,
    type: DataTypes.STRING,
    accountId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};