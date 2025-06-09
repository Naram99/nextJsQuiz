import { Server } from "socket.io";

export default class ServerContext {
    constructor(public io: Server) {}

    public emitMap(roomId: string, event: string, map: Map<any, any>, ...args: any[]) {
        this.io.to(roomId).emit(event, Array.from(map), ...args);
    }
}
