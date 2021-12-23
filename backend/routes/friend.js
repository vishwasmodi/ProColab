const express = require('express');
const router = express.Router();

const { FriendRequest } = require('../models/friend_request');
const { Friendship } = require('../models/friendship');

const isAuthenticated = require('../middleware/auth');

router.get('/requests', isAuthenticated, async (req, res) => {
    const userId = req.user._id;
    // const received = req.params.received;

    const requests = await FriendRequest.find({ requestee: userId }).populate('requestee', 'name username email').exec();

    res.send(requests);
});

router.post('/requests/new', isAuthenticated, async (req, res) => {

    if (req.body._id === req.user._id) {
        res.status(400).send("Cannot send friend request to self!");
        return;
    }

    const participants = {
        requester: req.user._id,
        requestee: req.body._id
    };

    if (await FriendRequest.findOne(participants).exec()) {
        res.status(400).send("Request already sent");
        return;
    }


    try {
        await FriendRequest.create({
            ...participants,
            message: req.body.message
        });

        res.send("Friend request sent successfully!");
    } catch (error) {
        res.status(400).send("Could not send friend request!");
    }
});

router.post('/requests/:requestId', async (req, res) => {
    const { action } = req.query;
    console.log(action)

    if (action !== 'accept' && action !== 'ignore')
        res.status(400).send("Invalid action request!");

    let friendRequest;

    try {
        friendRequest = await FriendRequest.findById(req.params.requestId).exec();
    } catch (error) {
        res.status(400).send("Request not found!");
    }

    if (action === 'accept') {
        Friendship.create({
            friends: [
                friendRequest.requestee,
                friendRequest.requester
            ]
        });
        friendRequest.update({ status: 'accepted' });
    }
    else {
        friendRequest.update({ status: 'ignored' });
    }

});

module.exports = router

