const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const AccountController = require("../controllers/AccountController");

router.get("/accounts", authentication, AccountController.getAccounts);
router.get("/account/:id", authentication, AccountController.getAccountById);
router.post("/create-account", authentication, AccountController.createAccount);
router.delete("/delete-account/:id", authentication, AccountController.deleteAccount);
module.exports = router;
