const { where } = require("sequelize");
const { Loan, User, Account } = require("../models/index");
const { get } = require("../routes/card");

const LoanController = {
  async create(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res
          .status(404)
          .send({ msg: "Usted no está autorizado para esta acción" });
      }

      const account = await Account.findOne({ where: { UserId: req.user.id } });
      if (!account) {
        return res.status(404).send({ msg: "Cuenta no encontrada" });
      }

      if (!req.body.amount || req.body.amount <= 0) {
        return res.status(400).send({ msg: "Monto inválido" });
      }

      const loan = await Loan.create({
        ...req.body,
        userId: req.user.id,
      });

      account.balance = Number(account.balance) + Number(req.body.amount);
      await account.save();

      res.status(200).send({ msg: "Préstamo otorgado correctamente", loan });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Hubo un error al solicitar préstamo" });
    }
  },
  async getById(req, res) {
    try {
      const loans = await Loan.findAll({
        where: { userId: req.user.id },
      });

      if (loans.length === 0) {
        return res.status(404).send({ msg: "No hay préstamos asociados" });
      }

      res.status(200).send(loans);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error al obtener los préstamos" });
    }
  },
};

module.exports = LoanController;
