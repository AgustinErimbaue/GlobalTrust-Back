const { User } = require("../models/index");
const bcrypt = require("bcryptjs");

const UserController = {
  async create(req, res) {
    try {
      const password = await bcrypt.hashSync(req.body.password, 10);
      req.body.password = password;
      const user = await User.create(req.body);
      res.status(201).send({ msg: "El usuario se creo correctamente", user });
    } catch (error) {
      console
        .error(error)
        .res.status(500)
        .sed({ msg: "Error al crear el usuario", error });
    }
  },
};

module.exports = UserController;
