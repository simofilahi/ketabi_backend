const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
var socketIo = require("socket.io");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// sokcet
const io = socketIo(server);
// server
server.listen(
  PORT,
  console.log(`Server runing in ${process.env.NODE_ENV} on port ${PORT}`)
);

// DB MODEL
const Message = require("./api/models/messages_model");
io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("join", roomId => {
    console.log({ roomId });
    socket.join(roomId);
  });
  socket.on("sendMessage", data => {
    const { room_id, sender_id, reciver_id, message } = data;
    const newmsg = new Message({
      room_id,
      sender_id,
      reciver_id,
      message
    });
    console.log({ data: data });
    newmsg
      .save()
      .then(res => {
        console.log({ data });

        // socket.broadcast.emit("newMessage", msg.content);
        console.log(data.roomId);
        io.to(data.roomId).emit("newMessage", data);
      })
      .catch(err => {});
  });
  socket.on("disconnect", () => {
    console.log("a user left");
  });
});
