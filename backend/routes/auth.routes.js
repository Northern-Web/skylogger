const express = require('express');

const authController = require("./../controllers/auth.controller");
const router = express.Router();

router.get("/authenticate", authController.authentication);
router.get("/details", authController.getUserDetails);
router.post("/verify", authController.verifyToken);

module.exports = router;