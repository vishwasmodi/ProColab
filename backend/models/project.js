const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxlength: 20,
  },
  description: {
    type: String,
    maxlength: 2000,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  githubRepo: {
    type: String,
  },
  techStack: {
    type: Array,
  },
  colaborators: {
    type: Array,
  },
  votes: {
    type: Number,
    default: 0,
  },
  colaboratorsLimit: {
    type: Number,
    default: 0,
  },
});

const Project = mongoose.model("Project", projectSchema);

exports.Project = Project;
