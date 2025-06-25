const { Account } = require("../models/index");

const AccountController = {
  async getAccounts(req, res) {
    try {
      const accounts = await Account.findAll({
        where: { UserId: req.user.id },
      });
      if (accounts.length === 0) {
        return res.status(404).send({ msg: "No hay cuentas asociadas" });
      }
      res.status(200).send(accounts);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error al obtener cuentas" });
    }
  },
  async getAccountById(req, res) {
    try {
      const account = await Account.findByPk(req.params.id);

      if (!account) {
        return res.status(404).send({ msg: "Cuenta no encontrada" });
      }

      if (account.UserId !== req.user.id) {
        return res.status(403).send({ msg: "No autorizado" });
      }

      res.status(200).send(account);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error al obtener cuenta" });
    }
  },
  async createAccount(req, res) {
    try {
      let accountNumber = "";
      for (let i = 0; i < 10; i++) {
        accountNumber += Math.floor(Math.random() * 10).toString();
      }
      const accountData = {
        ...req.body,
        accountNumber,
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
  async updateAccount(req, res) {
    try {
      const account = await Account.findByPk(req.params.id);

      if (!account) {
        return res.status(404).send({ msg: "Cuenta no encontrada" });
      }

      if (account.UserId !== req.user.id) {
        return res.status(403).send({ msg: "No autorizado" });
      }

      const updatedAccount = await account.update(req.body);
      res
        .status(200)
        .send({ msg: "Cuenta actualizada correctamente", updatedAccount });
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: "Error al actualizar cuenta" });
    }
  },
};

module.exports = AccountController;
