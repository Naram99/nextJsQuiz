import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { db } from "./drizzle/db";
import { UserTable } from "./drizzle/schema";

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
    io.to("all").emit("chatMessage", "A new user connected");
    socket.join("all");

    socket.on("chatMessage", (msg: string, room: string) => {
        socket.to(room).emit("chatMessage", msg, room);
    })

    socket.on("disconnect", (reason) => {
        console.log(`A user disconnected due to ${reason}.`);
    });
});

app.get("/", (req, res) => {
    console.log("Welcome to the server");
    test().then()
})

async function test() {
    console.log(process.env.DB_USER);
    const data = await db.select().from(UserTable);
    console.log(data);
    // TODO: DB connection test
}

httpServer.listen(process.env.PORT || 3210);
console.log(`Listening on port ${process.env.PORT}`);
