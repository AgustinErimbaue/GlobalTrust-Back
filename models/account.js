'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, { foreignKey: 'UserId' });
      Account.hasMany(models.Card, { foreignKey: 'accountId' });
      Account.hasMany(models.Transaction, { foreignKey: 'originAccountId', as: 'OriginTransactions' });
      Account.hasMany(models.Transaction, { foreignKey: 'destinationAccountId', as: 'DestinationTransactions' });
    }
  }
  Account.init({
    accountNumber: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};