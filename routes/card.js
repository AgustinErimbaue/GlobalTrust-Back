const express = require("express");
const router = express.Router();
const CardController = require("../controllers/CardController");
const { authentication } = require("../middleware/authentication");

router.post("/create-card", authentication, CardController.createCard);
router.delete("/delete-card/:id", authentication, CardController.deleteCard);

module.exports = router;
