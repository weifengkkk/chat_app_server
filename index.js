const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./Routes/UserRoutes")
const messageRoutes = require("./Routes/MessageRoutes")
const app = express()
const socket = require('socket.io')
require('dotenv').config();

app.use(cors())
app.use(express.json())
app.use('/api',userRoutes);
app.use('/api',messageRoutes);
mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log(`connect successful! ${process.env.MONGO_URL}`);
}).catch((err)=>{console.log(err)})

const server =app.listen(process.env.PORT, ()=>{
    console.log(`Server Start on Port ${process.env.PORT}`);
}) 

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
    console.log(global.onlineUsers)
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    console.log(sendUserSocket)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});

