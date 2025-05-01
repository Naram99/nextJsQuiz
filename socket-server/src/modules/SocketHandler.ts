import { Socket } from "socket.io";
import DbHandler from "./DbHandler";

export default class SocketHandler {
    private _socket: Socket;
    private _dbHandler: DbHandler = new DbHandler;
    private _userId: string;
    private _rooms: string[] = [];

    constructor(socket: Socket, id: string) {
        this._socket = socket;
        this._userId = id;
    }

    async getRooms() {
        const roomQuery = await this._dbHandler.selectRoomsForUser(this._userId);
        this._rooms = roomQuery.map(data => data.id);
    }

    joinRooms() {
        this._socket.join("all");
        this._rooms.forEach(id => this._socket.join(id));
    }
}