const express = require("express");
const router = express.Router();
const UserController = require("../controllers/Usercontroller");

router.post("/register", UserController.create);

module.exports = router;
