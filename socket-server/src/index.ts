import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import { db } from "./drizzle/db";
import { ChatRoomTable } from "./drizzle/schema";
import verifyToken from "./utils/verifyToken";
import UserHandler from "./modules/UserHandler";
import SocketHandler from "./modules/SocketHandler";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("Invalid token"));

        const userData = await verifyToken(
            socket.handshake.auth.token,
            String(process.env.JWT_SECRET)
        );

        socket.data.user = userData;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return next(new Error("Invalid token"));
    }
});

io.on("connection", (socket: Socket) => {
    const userData = socket.data.user;
    const uh = new UserHandler(userData.id, userData.name, userData.role);
    const sh = new SocketHandler(socket, uh.id);

    // TODO: socket events in class

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
    // test().then();
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
