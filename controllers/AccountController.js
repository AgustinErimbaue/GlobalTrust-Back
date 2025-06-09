const { Account } = require("../models/index");
const { Op } = require("sequelize");

const AccountController = {
  async createAccount(req, res) {
    try {
      const accountData = {
        ...req.body,
        UserId: req.user.id,
      };
      const account = await Account.create(accountData);
      res.status(201).send({ msg: "Cuenta creada correctamente", account });
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: "Error al crear cuenta" });
    }
  },
};

module.exports = AccountController;
