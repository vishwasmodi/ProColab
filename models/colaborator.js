const mongoose = require("mongoose");

const colaboratorSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  colaborator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Colaborator = mongoose.model("Colaborator", colaboratorSchema);

exports.Colaborator = Colaborator;
