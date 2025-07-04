'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Account, { foreignKey: 'originAccountId', as: 'OriginAccount' });
      Transaction.belongsTo(models.Account, { foreignKey: 'destinationAccountId', as: 'DestinationAccount' });
    }
  }
  Transaction.init({
    amount: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    originAccountId: DataTypes.UUID,
    destinationAccountId: DataTypes.UUID,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};