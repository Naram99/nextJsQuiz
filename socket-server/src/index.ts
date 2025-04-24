import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    socket.on("disconnect", (username) => {
        console.log(`${username} disconnected.`);
    });
});

httpServer.listen(process.env.PORT || 3210);
