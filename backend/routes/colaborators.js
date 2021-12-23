const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Colaborator } = require("../models/colaborator");

router.get("/:id", async (req, res) => {
  const colaborators = await Colaborator.find({
    projectId: req.params.id,
  });
  res.send(colaborators);
});

module.exports = router;
