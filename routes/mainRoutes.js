const express = require("express");
const handleAsync = require("../utils/handleAsync");
const { index, about, contact } = require("../controllers/mainController");

const router = express.Router();

router.get("", handleAsync(index));
router.get("/about", about);
router.get("/contact", contact);

module.exports = router;
