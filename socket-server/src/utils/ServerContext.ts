import { Server } from "socket.io";

export default class ServerContext {
    constructor(public io: Server) {}
}