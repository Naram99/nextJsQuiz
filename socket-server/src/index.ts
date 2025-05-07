import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import { db } from "./drizzle/db";
import { ChatRoomTable } from "./drizzle/schema";
import verifyToken from "./utils/verifyToken";
import UserHandler from "./modules/UserHandler";
import ChatHandler from "./modules/ChatHandler";

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
    console.log(`User connected with id: ${socket.id}`);

    const userData = socket.data.user;
    const uh = new UserHandler(userData.id, userData.name, userData.role);
    const ch = new ChatHandler(io, socket, uh.id, uh.name);
    ch.initialize();

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
            "adfa6e48-587a-43a0-9d95-479418724e77",
            "cf85752e-56db-49f4-867f-c855db35bc66",
        ],
        name: "Tesztnév"
    });

    const data = await db.select().from(ChatRoomTable);
    console.log(data);
}

httpServer.listen(process.env.PORT || 3210);
console.log(`Listening on port ${process.env.PORT}`);
