import {Server } from "socket.io"
import http from "http"
import express from "express"


const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    pingTimeout: 60000,
    cors : {
        origin : ["http://localhost:5173"]
    }
})

//online drivers
const driverSocketMap = {} //{driverId : socketId}


const userSocketMap ={}

function getDriverSocketId(driverId) {
    return driverSocketMap[driverId]
}

io.on("connection",(socket) => {
    
  const driverId = socket.handshake.query.driverId;
  const userId = socket.handshake.query.userId;
  
  console.log("Driver ID:", driverId, "User ID:", userId);
  
  // Ensure userId is a valid string before storing it
  if (typeof userId === "string" && userId.trim() !== "") {
      userSocketMap[userId] = socket.id;
      console.log("A user connected", socket.id);
      
      io.emit("getOnlineDrivers", Object.keys(driverSocketMap));
  } else {
      console.warn("Skipping userId:", userId);
  }
  
  // Ensure driverId is a valid string before storing it
  if (typeof driverId === "string" && driverId.trim() !== "") {
      driverSocketMap[driverId] = socket.id;
      console.log("A driver connected", socket.id);
      io.emit("getOnlineDrivers", Object.keys(driverSocketMap));
  } else {
      console.warn("Skipping driverId:", driverId);
  }
  
    
    
    //used to send events to all the connected clients

    

    socket.on("disconnect",() => {
      console.log("A driver disconnected", socket.id);
      delete driverSocketMap[driverId]
      delete userSocketMap[userId]
      io.emit("getOnlineDrivers",Object.keys(driverSocketMap))
  })
  ;
})

export {io, app, server,getDriverSocketId}