const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const { Project } = require("../models/project");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// For Signup
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = User.find({ email: req.body.email });
  if (user.email) return res.status(400).send("User already registered..");

  user = User.find({ username: req.body.username });
  if (user.username) return res.status(400).send("Username already taken");

  user = new User(_.pick(req.body, ["name", "username", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res.send({ token: token, userId: user._id });
});

router.get("/:username", async (req, res) => {
  let user = await User.findOne({ username: req.params.username }).select(
    "-password"
  );
  console.log(user);
  let ownProjects = await Project.find({
    user: user._id,
  });
  let allProjects = await Project.find();
  let colabProjects = [];
  allProjects.map((project) => {
    let flag = 0;
    project.colaborators.map((uid) => {
      if (uid.toString() === user._id.toString()) {
        flag = 1;
      }
    });
    if (flag) colabProjects.push(project);
  });
  const ret = {
    user: user,
    cloabProjects: colabProjects,
    ownProjects: ownProjects,
  };
  res.send(ret);
});
module.exports = router;
