const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
// con
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const getRoom = roomId => {
  return rooms.find(room => room.id === roomId);
};
var rooms=[];
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  var socketId=socket.id;
  socket.on("join_room", (data,callback) => {
    
    const check = getRoom(data);
    var flag = false;
    console.log(data);
    if(!check){ // New Room
    const room = {
      id: data,
      players: [],
    
    };
    room.players.push({ socketId ,active :true});
    rooms.push(room);
    socket.join(data);
    
    }
    else{
      var rm=getRoom(data);
      if(rm.players.length==2){
        callback("ROOM IS FULL")
      }else{
        rm.players.push({socketId,active:false});
        socket.join(data);
        socket.to(data).emit("change_color", {color: "green"});
      }
      // socket.to(socketId).emit("button_col",rooms);
    }
    console.log(rooms);
  });

  socket.on("send_prediction",(data)=>{
    console.log(data);
    socket.to(data.room).emit("receive_prediction",data);
  });

  socket.on("output_prediction",(data)=>{
    console.log(data);
    socket.to(data.room).emit("your_prediction",data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect_user",(data)=>{
    
    socket.leave(data);
    // console.log("disconnecting");
    // var rm=getRoom(data);
    const index = rooms.map(i => i.id).indexOf(data);

    // rm.players.filter()
    rooms[index].players=rooms[index].players.filter((item)=> {
      console.log(item);
      return item.socketId !== socketId
  })
  // console.log("disconnected",rooms,'');
  
  });
  
});

server.listen(3006, () => {
  console.log("SERVER IS RUNNING");
});
