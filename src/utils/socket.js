const { Chat } = require("../models/chat");
const socket = require("socket.io");
const crypto = require("crypto");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initilizeSocket = (server) => {
 const io = socket(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://dev-tinder-frontend-sigma.vercel.app",
      "https://www.dev-tinder-frontend-sigma.vercel.app",

      
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }, 
  path: "/api/socket.io",
});


  io.on("connection", (socket) => {
     console.log("New socket connected:", socket.id);
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log("joing roomh: " + roomId);

      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, location, userId, targetUserId, text }) => {
        //save message in database

        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + ": " + text);

          //from here we are implementing database storing query
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();
          // finished database setup
          io.to(roomId).emit("messageReceiver", { firstName, location, text });
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initilizeSocket;
