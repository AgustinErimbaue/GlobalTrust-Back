'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Loan.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Loan.init({
    amount: DataTypes.DECIMAL,
    interestRate: DataTypes.DECIMAL,
    termMonths: DataTypes.INTEGER,
    monthlyPayment: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};