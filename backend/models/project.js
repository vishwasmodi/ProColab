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
  userName: {
    type: String,
  },
  githubRepo: {
    type: String,
  },
  techStack: {
    type: Array,
  },
  colaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  votes: {
    type: Number,
    default: 0,
  },
  colaboratorsLimit: {
    type: Number,
    default: 0,
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  colaboratorsUsername: [
    {
      type: String,
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

exports.Project = Project;
