const { where } = require("sequelize");
const { Transaction, Account } = require("../models/index");

const TransactionController = {
  async create(req, res) {
    try {
      const { amount, destinationAccountId, description, type } = req.body;

      const originAccount = await Account.findOne({
        where: { UserId: req.user.id },
      });

      if (!originAccount) {
        return res
          .status(404)
          .send({ msg: "El usuario no tiene cuentas asociadas" });
      }

      if (!amount || amount <= 0) {
        return res.status(400).send({ msg: "Monto inválido" });
      }

      if (originAccount.balance < amount) {
        return res.status(400).send({
          msg: `Saldo insuficiente, su saldo es: ${originAccount.balance}`,
        });
      }

      const destinationAccount = await Account.findByPk(destinationAccountId);
      if (!destinationAccount) {
        return res
          .status(404)
          .send({ msg: "Cuenta de destino no encontrada" });
      }

      const transaction = await Transaction.create({
        amount,
        type: type || "transferencia",
        description: description || "",
        originAccountId: originAccount.id,
        destinationAccountId,
        timestamp: new Date(),
      });

      originAccount.balance = Number(originAccount.balance) - Number(amount);
      destinationAccount.balance = Number(destinationAccount.balance) + Number(amount);
      await originAccount.save();
      await destinationAccount.save();

      return res.status(201).send({
        msg: "Se hizo la transacción correctamente",
        transaction,
      });
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: "No se pudo realizar la transacción" });
    }
  },
};

module.exports = TransactionController;
