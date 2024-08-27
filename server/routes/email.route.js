const express = require("express");
const contactEmail = require("../controllers/email.controller.js");
const applyEmail = require("../controllers/email-apply.controller.js");
const router = express.Router();

router.post("/send-email", contactEmail);
router.post("/apply-email", applyEmail);
module.exports = router;
