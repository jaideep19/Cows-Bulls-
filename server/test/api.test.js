import React, { useState,useEffect } from "react";

const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
// import { disconnect } from "process";
const io = require("socket.io-client");
const mp = require('../index');

describe("my awesome project", () => {
  let serverSocket, clientSocket, room;

  beforeAll(() => {
      clientSocket = new Client(`http://localhost:3000`);
      console.log(clientSocket)
      serverSocket = mp;
      room = "123";
      clientSocket.emit("join_room", room,error => {
        alert(error);
      });
  });

  afterAll(() => {
    clientSocket.close();
  });

  test("should work", async(done) => {
    clientSocket.on("game_stat", (arg) => {
      let flg = 0;
      if(arg == "Won" || arg == "Disconnected"){
          flg = 1
      }  
      expect(flg).toBe(1);
      done();
    });
    clientSocket.emit("game_status", {message: "Won", roomm:room});
  });

//   test("should work (with ack)", (done) => {
//     serverSocket.on("hi", (cb) => {
//       cb("hola");
//     });
//     clientSocket.emit("join_room", room,error => {
//       serverSocket  
//       expect(room).toBe("hola");
//       done();
//     });
//   });
});