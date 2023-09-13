const express = require("express");
const {
  admin_get,
  admin_post,
  admin_logout,
  admin_delete,
  admin_edit_get,
  admin_edit_put,
  admin_dashboard,
  admin_create_get,
  admin_create_post,
} = require("../controllers/adminController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.get("", admin_get);
router.post("", admin_post);
router.get("/dashboard", requireAuth, admin_dashboard);
router.get("/create", requireAuth, admin_create_get);
router.post("/create", requireAuth, admin_create_post);
router.delete("/delete/:id", requireAuth, admin_delete);
router.put("/edit/:id", requireAuth, admin_edit_put);
router.get("/edit/:id", requireAuth, admin_edit_get);
router.get("/logout", requireAuth, admin_logout);

module.exports = router;
