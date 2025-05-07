import { Server, Socket } from "socket.io";
import DbHandler from "./DbHandler";

export default class ChatHandler {
    private _io: Server;
    private _socket: Socket;
    private _dbHandler: DbHandler = new DbHandler();
    private _userId: string;
    private _userName: string;
    private _rooms: string[] = [];

    constructor(server: Server, socket: Socket, id: string, name: string) {
        this._io = server;
        this._socket = socket;
        this._userId = id;
        this._userName = name;
    }

    public async initialize() {
        await this.getRooms();
        this.joinRooms();
        this.addEvents();
    }

    private async getRooms(): Promise<void> {
        const roomQuery = await this._dbHandler.selectRoomsForUser(this._userId);
        this._rooms = roomQuery.map((data) => data.id);
    }

    private joinRooms(): void {
        this._socket.join("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
        this._rooms.forEach((id) => this._socket.join(id));
    }

    // TODO: socket events
    private addEvents() {
        this._socket.on("chatMessage", (msg: string, room: string) => {
            console.log(`Message: ${msg}; From: ${this._userName}; To: ${room}`);

            this._io.to(room).emit("chatMessage", msg, this._userName);
            this._dbHandler.insertChatMessage(room, this._userId, msg);
        });
    }
}
