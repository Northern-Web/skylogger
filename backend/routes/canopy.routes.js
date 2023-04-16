const express = require('express');

const canopyController = require("./../controllers/canopy.controller");
const router = express.Router();

router.post("/", canopyController.create);
router.delete("/:id", canopyController.delete);
router.patch("/:id", canopyController.patch);
router.get("/", canopyController.find);

module.exports = router;