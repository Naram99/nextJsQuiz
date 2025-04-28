import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log("A user connected.");
    socket.join("all");

    socket.on("chatMessage", (msg: string, room: string) => {
        io.to(room).emit("chatMessage", msg);
    })

    socket.on("disconnect", (username) => {
        console.log(`${username} disconnected.`);
    });
});

app.get("/", (req, res) => {
    console.log("Welcome to the server");
})

httpServer.listen(process.env.PORT || 3210);
console.log(`Listening on port ${process.env.PORT}`);
