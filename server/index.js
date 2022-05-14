const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const logger=require('./logger')

app.use(cors());

const server = http.createServer(app);
// cons
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
let doom;
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  doom = socket;
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
    logger.info("Room created");
    logger.info("New Client added");
    }
    else{
      var rm=getRoom(data);
      if(rm.players.length==2){
        callback("ROOM IS FULL")
        logger.error("Room is full, Client join request unable to process")
      }else{
        rm.players.push({socketId,active:false});
        socket.join(data);
        socket.to(data).emit("change_color", {color: "green"});
        logger.info("New Player added");
      }
      // socket.to(socketId).emit("button_col",rooms);
    }
    console.log(rooms);
  });

  socket.on("get_length", (data)=>{
    console.log(data);
    socket.to(data).emit("get_lngth", data);
    logger.info("Client requires digit length")
  })

  socket.on("set_length", (data)=>{
    console.log(data);
    socket.to(data.room).emit("set_lngth", data.length);
    logger.info("Digit length sent to client");
  })

  socket.on("send_prediction",(data)=>{
    console.log(data);
    socket.to(data.room).emit("receive_prediction",data);
    logger.info("Client's guess sent to opponent to get number of matchings");
  });

  socket.on("output_prediction",(data)=>{
    console.log(data);
    socket.to(data.room).emit("your_prediction",data);
    logger.info("Number pf vulls and cows on Client's guess is sent to client");
  });

  socket.on("game_status",(data)=>{
    console.log(data);
    socket.to(data.room).emit("game_stat",data);
    logger.info("Status of Game is shared with client");
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    logger.info("test function")
  });

  socket.on("disconnect_user",(data)=>{    
    socket.leave(data);
    logger.info("Client is dosconnected from the room")
    // console.log("disconnecting");
    // var rm=getRoom(data);
    const index = rooms.map(i => i.id).indexOf(data);

    // rm.players.filter()
    rooms[index].players=rooms[index].players.filter((item)=> {
      console.log(item);
      return item.socketId !== socketId
    })
    logger.info("Client's info stored in arrray is removed")
  // console.log("disconnected",rooms,'');
    if(io.sockets.adapter.rooms[data]){
        //if room exist
        socket.to(data).emit("game_stat",{message:"Disconnected", room:data});    
    }

  });
  
});

server.listen(3030, () => {
  logger.info('Server is runnning on 3030')
  console.log("SERVER IS RUNNING");
});

module.exports=doom;