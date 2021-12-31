const { Project } = require("../models/project");
const { User } = require("../models/user");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Project.find().sort("createdAt");
  projects.reverse();
  res.send(projects);
});

router.post("/", auth, async (req, res) => {
  const userName = await User.findById(req.user._id).exec();
  const techStack = req.body.techStack.split(" ");
  const colaborators = [req.user._id];
  const colaboratorsUsername = [userName.username];

  let project = new Project({
    name: req.body.name,
    description: req.body.description,
    user: req.user._id,
    userName: userName.name,
    githubRepo: req.body.githubRepo,
    votes: req.body.votes,
    techStack: techStack,
    colaboratorsLimit: req.body.colaboratorsLimit,
    colaborators: colaborators,
    colaboratorsUsername: colaboratorsUsername,
  });
  project = await project.save();
  res.send(project);
});

router.delete("/:id", auth, async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id);
  if (!project)
    return res.status(404).send("The project with the give id doesnt exist");
  res.send(project);
});

module.exports = router;
