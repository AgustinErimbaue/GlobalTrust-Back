const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const LoanController = require("../controllers/LoanController");

router.get("/", authentication, LoanController.getById);
router.post("/loan-requests", authentication, LoanController.create);

module.exports = router;
