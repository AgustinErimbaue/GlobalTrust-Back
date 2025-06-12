const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const TransactionController = require("../controllers/TransactionController");

router.post("/", authentication, TransactionController.create);

module.exports = router;
