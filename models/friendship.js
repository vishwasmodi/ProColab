const mongoose = require("mongoose");

const friendshipSchema = mongoose.Schema({
    friends: {
        type: [mongoose.Types.ObjectId],
        required: true,
    }
});

const Friendship = mongoose.model("Friendship", friendshipSchema);

module.exports = { Friendship };