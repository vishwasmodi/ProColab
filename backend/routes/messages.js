const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Message = require("../models/Message");

// New message
router.post("/", async (req, res) => {
  console.log(req.body);
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get previous messages
router.get("/:projectId", async (req, res) => {
  try {
    const messages = await Message.find({
      projectId: req.params.projectId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
