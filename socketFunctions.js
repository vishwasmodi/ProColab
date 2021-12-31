let chatUsers = [];

const addUser = (userId, currentChat, socketId) => {
  if (!chatUsers.some((user) => user.userId === userId)) {
    const user = { userId, currentChat, socketId };
    chatUsers.push(user);
    return user;
  } else {
    removeUser(socketId);
    const user = { userId, currentChat, socketId };
    chatUsers.push(user);
    return user;
  }
};

const removeUser = (socketId) => {
  chatUsers = chatUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return chatUsers.find((user) => user.userId === userId);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  chatUsers,
};
