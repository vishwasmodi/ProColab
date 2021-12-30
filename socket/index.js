const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
let receiverId;
const addUser = (userId, currentChat, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    const user = { userId, currentChat, socketId };
    users.push(user);
    return user;
  } else {
    removeUser(socketId);
    const user = { userId, currentChat, socketId };
    users.push(user);
    return user;
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A user connected.");

  socket.on("addUser", ({ userId, currentChat }) => {
    socket.join(currentChat);
    addUser(userId, currentChat, socket.id);
    io.emit("getUsers", users);
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
    console.log("A user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
