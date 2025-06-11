const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const AccountController = require("../controllers/AccountController");

router.post("/create-account", authentication, AccountController.createAccount);
router.delete("/delete-account/:id", authentication, AccountController.deleteAccount);
module.exports = router;
