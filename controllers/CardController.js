const { where } = require("sequelize");
const { Card, Account } = require("../models/index");

const CardController = {
  async createCard(req, res) {
    try {
      const account = await Account.findOne({ where: { UserId: req.user.id } });
      if (!account) {
        return res
          .status(404)
          .send({ msg: "El usuario no tiene cuentas asociadas" });
      }

      let number = "";
      let cvv = "";
      for (let i = 0; i < 16; i++) number += Math.floor(Math.random() * 10);
      for (let i = 0; i < 3; i++) cvv += Math.floor(Math.random() * 10);

      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 5);

      const cardData = {
        number,
        cvv,
        expirationDate,
        type: req.body.type || "Débito",
        userId: req.user.id,
        accountId: account.id,
      };

      const card = await Card.create(cardData);
      res.status(201).send({ msg: "Tarjeta creada correctamente", card });
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: "Error al crear tarjeta" });
    }
  },
  async deleteCard(req, res) {
    try {
      const card = await Card.findByPk(req.params.id);
      if (!card) {
        return res
          .status(404)
          .send({ msg: "No hay tarjeta asociada asociada" });
      }

      if (Number(card.userId) !== Number(req.user.id)) {
        return res.status(403).send({ msg: "No autorizado" });
      }
      await Card.destroy({ where: { id: req.params.id } });
      res.status(200).send({ msg: "Se elimino la tarjeta correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "No se pudo eliminar la tarjeta" });
    }
  },
  async getById(req, res) {
    try {
      const cards = await Card.findAll({
        where: { userId: req.user.id }
      });
      if (!cards || cards.length === 0) {
        return res.status(404).send({ msg: "No se encontraron tarjetas para este usuario" });
      }
      res.status(200).send(cards);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error al obtener las tarjetas" });
    }
  }
};

module.exports = CardController;
