import { Server, Socket } from "socket.io";
import DbHandler from "./DbHandler";
import { LobbyType } from "../utils/type/LobbyType.type";

export default class GameHandler {
    private io: Server;
    private socket: Socket;
    private dbHandler: DbHandler = new DbHandler();
    private userName: string;

    constructor(server: Server, socket: Socket, name: string) {
        this.io = server;
        this.socket = socket;
        this.userName = name;

        this.createGameEventSetup();
    }

    private createGameEventSetup() {
        this.socket.on(
            "createGame",
            (gameType: string, lobbyType: LobbyType, schemaId: string | null = null) => {
                console.log(`New game: ${gameType}; Lobby: ${lobbyType}`);

                switch (gameType) {
                    case "tictactoe":
                        // TODO: tictactoe
                        break;

                    case "quiz":
                        // TODO: quiz
                        break;
                }
            }
        );
    }
}
