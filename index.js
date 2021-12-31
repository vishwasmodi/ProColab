const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
var http = require("http");
// Joi.objectId = require("joi-objectid")(Joi);
const users = require("./routes/users");
const auth = require("./routes/auth");
const friend = require("./routes/friend");
const projects = require("./routes/projects");
const colaboratorsReq = require("./routes/colaboratorsReq");
const colaborator = require("./routes/colaborators");
const profile = require("./routes/profile");
const messages = require("./routes/messages");
const app = express();
const cors = require("cors");
const {
  addUser,
  removeUser,
  getUser,
  chatUsers,
} = require("./socketFunctions.js");
require("dotenv").config();

const { APP_USER, APP_USER_PASSWORD } = process.env;

mongoose
  .connect(
    `mongodb+srv://${APP_USER}:${APP_USER_PASSWORD}@procolab.1cmdh.mongodb.net/ProColab?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/friend", friend);
app.use("/api/projects", projects);
app.use("/api/colaboratorsReq", colaboratorsReq);
app.use("/api/profile", profile);
app.use("/api/messages", messages);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const server = app.listen(port, () => console.log("listening to port 5000"));

const io = require("socket.io")(server, {
  cors: {
    origin: "* ",
  },
});

io.on("connection", (socket) => {
  socket.on("addUser", ({ userId, currentChat }) => {
    socket.join(currentChat);
    addUser(userId, currentChat, socket.id);
    io.emit("getUsers", chatUsers);
  });

  socket.on("sendMessage", ({ senderId, currentChat, text }) => {
    const user = getUser(senderId);
    if (user) {
      io.to(user.currentChat).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", chatUsers);
  });
});
