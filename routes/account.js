const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const AccountController = require("../controllers/AccountController");

router.post("/create-account", authentication, AccountController.createAccount);

module.exports = router;

