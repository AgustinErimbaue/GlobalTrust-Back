const { where } = require("sequelize");
const { User, Token } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json");

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

  async login(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res
          .status(400)
          .send({ msg: "Usuario o contraseña incorrectos" });
      }
      const isMatch = bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ msg: "Usuario o contraseña incorrectos" });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);

      res.send({ msg: "Bienvenid@ " + user.fullName, user, token });
      Token.create({ token, UserId: user.id });
    } catch (error) {
      console
        .error(error)
        .res.status(500)
        .send({ msg: "Error al iniciar sesion", error });
    }
  },
};

module.exports = UserController;
