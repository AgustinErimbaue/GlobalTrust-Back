const express = require("express");
const router = express.Router();
const UserController = require("../controllers/Usercontroller");
const { authentication } = require("../middleware/authentication");

router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);
router.delete("/delete-user/:id", authentication, UserController.deleteUser);
router.put("/update-user/:id", authentication, UserController.updateUser);
module.exports = router;
