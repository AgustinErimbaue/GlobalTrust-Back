const { Card, Account } = require("../models/index");

const CardController = {
  async createCard(req, res) {
    try {
      const account = await Account.findOne({ where: { UserId: req.user.id } });
      if (!account) {
        return res.status(404).send({ msg: "El usuario no tiene cuentas asociadas" });
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
};

module.exports = CardController;
