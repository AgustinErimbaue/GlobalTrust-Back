const { where } = require("sequelize");
const { User, Token, sequelize } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = require("sequelize");

const UserController = {
  async create(req, res) {
    try {
      const password = await bcrypt.hashSync(req.body.password, 10);
      req.body.password = password;
      const user = await User.create(req.body);
      res.status(201).send({ msg: "El usuario se creo correctamente", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error al crear el usuario", error });
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
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ msg: "Usuario o contraseña incorrectos" });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);

      const userData = { ...user.toJSON() };
      delete userData.password;

      res.send({ msg: "Bienvenid@ " + user.fullName, user: userData, token });
      await Token.create({ token, UserId: user.id });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error al iniciar sesion", error });
    }
  },
  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ msg: "Sesión cerrada correctamente" });
    } catch (error) {
      console
        .error(error)
        .res.status(500)
        .send({ msg: "hubo un problema al tratar de desconectarte" });
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).send({ msg: "No se encontro el usuario" });
      }

      await User.destroy({ where: { id: req.params.id } });
      res
        .status(200)
        .send({ msg: "Se elimino el usuario correctamente", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error al eliminar el usuario" });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).send({ msg: "no se encontro usuario" });
      }
      await User.update(req.body, {
        where: { id: req.params.id },
      });
      res
        .status(201)
        .send({ msg: "Se a actualizado el usuario correctamente" });
    } catch (error) {
      console.error(error)
      res.status(500).send({msg:"no se pudo actualizar el usuario"})
    }
  },
};

module.exports = UserController;
