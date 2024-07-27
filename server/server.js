import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import e from "express";
const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
//using it as a middleware for api
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
app.get("/", (req, res) => {
  res.send("server started:)");
});
io.on("connection", (socket) => {
  // console.log("you are connected");
  socket.on("message", (data) => {
    // console.log(data);
    socket.to(data.room).emit("receiveMsg", data.message);
  });
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
