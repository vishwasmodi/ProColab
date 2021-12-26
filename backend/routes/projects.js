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
  let project = new Project({
    name: req.body.name,
    description: req.body.description,
    user: req.user._id,
    userName: userName.name,
    githubRepo: req.body.githubRepo,
    votes: req.body.votes,
    techStack: techStack,
    colaborators: req.body.colaborators,
    colaboratorsLimit: req.body.colaboratorsLimit,
  });
  project = await project.save();
  res.send(project);
});

router.post("/collaborate/:id", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) res.send("Wrong user");
  const project = await Project.findById(req.params.id);
  if (project.collaborators.find(user._id))
    res.send("User is already colaborator");
  if (project.colaboratorsLimit >= project.colaborators.length())
    res.send("Max number of colaborators for this project reached");
  res.send("Hello");
});

router.delete("/:id", auth, async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id);
  if (!project)
    return res.status(404).send("The project with the give id doesnt exist");
  res.send(project);
});

module.exports = router;
