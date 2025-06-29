import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import { db } from "./drizzle/db";
import { ChatRoomTable, QuizTable } from "./drizzle/schema";
import verifyToken from "./utils/verifyToken";
import UserHandler from "./modules/UserHandler";
import ChatHandler from "./modules/ChatHandler";
import LobbyManager from "./modules/LobbyManager";
import { UserInLobby } from "./utils/type/UserInLobby.type";
import ServerContext from "./utils/ServerContext";
import { fullTestQuiz } from "./utils/FullTestQuiz";
import { DRVQuizData } from "./utils/DRVQuiz4";

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
    // TODO: guest auth with no token
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

const sc = new ServerContext(io);
const lm = new LobbyManager(sc);

io.on("connection", (socket: Socket) => {
    console.log(`User connected with id: ${socket.id}`);

    const userData = socket.data.user;
    const lobbyUser: UserInLobby = {
        userId: userData.id,
        name: userData.name,
        socket: socket,
        isConnected: true,
        isReady: false,
        score: 0,
        correct: null,
    };
    const uh = new UserHandler(userData.id, userData.name, userData.role);
    const ch = new ChatHandler(io, socket, uh.id, uh.name);
    ch.initialize();

    lm.lobbiesData.forEach((lobby) => {
        if (lobby.hasUser(lobbyUser.userId))
            lobby.reconnectUser(lobbyUser.userId, socket);
    });

    socket.on("validateJoinCode", (code) => {
        socket.emit("validateJoinCodeAnswer", lm.checkIfLobbyExists(code));
    });

    socket.on("checkIfUserInLobby", (code) => {
        socket.emit(
            "userInLobby",
            lm.lobbiesData.get(code)?.hasUser(lobbyUser.userId)
        );
    });

    socket.on("joinLobby", (code) => {
        lm.removeUserFromAllLobbies(lobbyUser);
        socket.emit("joinLobbyOk", lm.addUserToLobby(lobbyUser, code), code);
        // console.log(lm.lobbiesData);
    });

    socket.on("createLobby", () => {
        lm.removeUserFromAllLobbies(lobbyUser);
        let newCode = generateLobbyCode(Number(process.env.LOBBY_CODE_LENGTH));
        while (lm.checkIfLobbyExists(newCode)) newCode = generateLobbyCode(6);
        if (lm.createLobby(newCode, lobbyUser))
            socket.emit("joinLobbyOk", true, newCode);
    });

    socket.on("getLobbyData", (code: string) => {
        io.to(code).emit(
            "lobbyData",
            lm.lobbyUsers(code),
            lm.lobbySettings(code),
            lm.lobbiesData.get(code)?.owner.name
        );
    });

    socket.on("leaveLobby", (code: string) => {
        lm.removeUserFromLobby(lobbyUser, code);
        if (lm.lobbiesData.has(code)) {
            io.to(code).emit(
                "lobbyData",
                lm.lobbyUsers(code),
                lm.lobbySettings(code),
                lm.lobbiesData.get(code)?.owner.name
            );
        } else {
            io.to(code).emit("joinLobbyOk", false);
        }
    });

    socket.on("disconnect", (reason) => {
        console.log(`A user disconnected due to ${reason}.`);
        lm.lobbiesData.forEach((lobby) => {
            if (lobby.hasUser(lobbyUser.userId))
                lobby.handleDisconnect(lobbyUser.userId);
        });
        // lm.removeUserFromAllLobbies(lobbyUser);
        console.log(lm.lobbiesData);
    });
});

app.get("/", () => {
    console.log("Welcome to the server");
    test().then();
});

async function test() {
    console.log(process.env.DB_USER);

    const testInsert = await db.insert(QuizTable).values({
        userId: "22ee4737-db18-4e85-8f56-e766c828b166",
        title: "FullTest",
        type: "WinnerSelect",
        hasCategories: true,
        questions: fullTestQuiz,
    });

    const data = await db.select().from(QuizTable);
    console.log(data);
}

function generateLobbyCode(length: number): string {
    let code = "";
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars.charAt(randomIndex);
    }
    return code;
}

httpServer.listen(process.env.PORT || 3210);
console.log(`Listening on port ${process.env.PORT}`);
