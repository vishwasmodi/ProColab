const mongoose = require("mongoose");

const friendRequestSchema = mongoose.Schema({
    requester: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    requestee: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    message: {
        type: String,
        max: [128, "Keep the messages short!"]
    }
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

module.exports = { FriendRequest };