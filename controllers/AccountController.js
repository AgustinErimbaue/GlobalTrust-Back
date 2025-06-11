const { Account } = require("../models/index");
const { Op, where } = require("sequelize");

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
  async deleteAccount(req, res) {
    try {
      const account = await Account.findByPk(req.params.id);

      if (account.UserId !== req.user.id) {
        return res.status(403).send({ msg: "No autorizado" });
      }
      if (!account) {
        return res.status(404).send({ msg: "No hay cuenta asociada" });
      }

      await Account.destroy({ where: { id: account.id } });

      return res
        .status(204)
        .send({ msg: "Se eliminó correctamente la cuenta" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ msg: "Error interno del servidor" });
    }
  },
};

module.exports = AccountController;
