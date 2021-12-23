const mongoose = require("mongoose");

const colaboratorReqSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  status: {
    type: Boolean,
  },
});

const ColaboratorReq = mongoose.model("ColaboratorReq", colaboratorReqSchema);
exports.ColaboratorReq = ColaboratorReq;
