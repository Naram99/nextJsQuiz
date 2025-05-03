import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import { db } from "./drizzle/db";
import { ChatRoomTable, UserTable } from "./drizzle/schema";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket: Socket) => {
    // TODO: token verify
    const userId = socket.handshake.auth.token;

    io.to("all").emit("chatMessage", "A new user connected");
    socket.join("all");

    socket.on("chatMessage", (msg: string, room: string) => {
        socket.to(room).emit("chatMessage", msg, room);
    });

    socket.on("disconnect", (reason) => {
        console.log(`A user disconnected due to ${reason}.`);
    });
});

app.get("/", () => {
    console.log("Welcome to the server");
    test().then();
});

async function test() {
    console.log(process.env.DB_USER);

    const testInsert = await db.insert(ChatRoomTable).values({
        userIdArray: [
            "22ee4737-db18-4e85-8f56-e766c828b166",
            "40b5e4d6-386c-467e-9295-781de70d0e5b",
            "45ad31c7-416d-4136-bbc8-443a556c640a",
        ],
    });

    const data = await db.select().from(ChatRoomTable);
    console.log(data);
}

httpServer.listen(process.env.PORT || 3210);
console.log(`Listening on port ${process.env.PORT}`);
