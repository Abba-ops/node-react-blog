const express = require("express");
const handleAsync = require("../utils/handleAsync");
const { get_post_details } = require("../controllers/postsController");

const router = express.Router();

router.get("/:id", handleAsync(get_post_details));

module.exports = router;
