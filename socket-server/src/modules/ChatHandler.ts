import { Server, Socket } from "socket.io";
import DbHandler from "./DbHandler";

export default class ChatHandler {
    private io: Server;
    private socket: Socket;
    private dbHandler: DbHandler = new DbHandler();
    private userId: string;
    private userName: string;
    private rooms: string[] = [];

    constructor(server: Server, socket: Socket, id: string, name: string) {
        this.io = server;
        this.socket = socket;
        this.userId = id;
        this.userName = name;
    }

    public async initialize() {
        await this.getRooms();
        this.joinRooms();
        this.addEvents();
    }

    private async getRooms(): Promise<void> {
        const roomQuery = await this.dbHandler.selectRoomsForUser(this.userId);
        this.rooms = roomQuery.map((data) => data.id);
    }

    private joinRooms(): void {
        this.socket.join("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
        this.rooms.forEach((id) => this.socket.join(id));
    }

    // TODO: socket events
    private addEvents() {
        this.socket.on("chatMessage", (msg: string, room: string) => {
            console.log(`Message: ${msg}; From: ${this.userName}; To: ${room}`);

            this.io.to(room).emit("chatMessage", msg, this.userName, room);
            this.dbHandler.insertChatMessage(room, this.userId, msg);
        });
    }
}
