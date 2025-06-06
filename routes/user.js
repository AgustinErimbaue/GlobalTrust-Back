const express = require("express");
const router = express.Router();
const UserController = require("../controllers/Usercontroller");
const { authentication } = require("../middleware/authentication");

router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);
module.exports = router;
