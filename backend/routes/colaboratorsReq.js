const { ColaboratorReq } = require("../models/colaboratorReq");
const { Project } = require("../models/project");
const { User } = require("../models/user");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const requests = await ColaboratorReq.find({
    receiverId: req.user._id,
  });

  res.send(requests);
});

router.post("/", auth, async (req, res) => {
  const receiverId = await Project.findById(req.body.projectId);
  const userName = await User.findById(req.user._id);
  let request = new ColaboratorReq({
    senderId: req.user._id,
    receiverId: receiverId.user._id,
    projectId: req.body.projectId,
    senderName: userName.name,
    projectName: receiverId.name,
    status: false,
  });
  request = await request.save();
  res.send(request);
});

// Change status of request
// Here id is request id
router.post("/:id", auth, async (req, res) => {
  if (req.user._id !== req.body.receiverId) res.send("Wrong request id");
  const request = await ColaboratorReq.findById(req.params.id).exec();
  if (req.body.status) {
    await Project.findByIdAndUpdate(request.projectId.toString(), {
      $push: {
        colaborators: request.senderId,
      },
      function(err) {
        if (err) return next(err);
      },
    }).exec();
  }
  res.send("Hello");
});

module.exports = router;
