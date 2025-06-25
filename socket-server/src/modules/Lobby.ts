import { Socket } from "socket.io";
import { LobbySettings } from "../utils/interface/LobbySettings.interface";
import { UserInLobby } from "../utils/type/UserInLobby.type";
import Match from "./Match";
import ServerContext from "../utils/ServerContext";
import { LobbyType } from "../utils/type/LobbyType.type";
import { GameType } from "../utils/type/GameType.type";

export default class Lobby {
    private users: Map<string, UserInLobby> = new Map();
    public settings: LobbySettings = {
        lobbyType: "open",
        minUsers: 2,
        maxUsers: 9,
        game: "tictactoe",
    };
    private match: Match;

    constructor(
        public readonly code: string,
        public owner: UserInLobby,
        private context: ServerContext
    ) {
        this.users.set(owner.userId, owner);
        owner.socket?.join(code);

        this.match = new Match(this.code, context);
        this.socketListenersSetup();
    }

    private socketListenersSetup(): void {
        this.users.forEach((user) => {
            user.socket?.removeAllListeners("setRound");
            user.socket?.removeAllListeners("startMatch");
            user.socket?.removeAllListeners("lobbyTypeChange");
            user.socket?.removeAllListeners("gameTypeChange");
            user.socket?.removeAllListeners("quizChange");

            user.socket?.on(
                "setRound",
                (id: string, name: string, round: number) => {
                    if (name === this.owner.name) {
                        this.match.round = round;
                        this.context.io.to(id).emit("roundChange", round);
                    }
                }
            );
            user.socket?.on("startMatch", (code: string, name: string) => {
                // TODO: Ellenőrizni a játékosok számát, hogy megfelelő-e
                if (this.owner.name === name) {
                    this.matchStart();
                    this.context.io
                        .to(code)
                        .emit("matchPrepare", this.settings.game, code);
                }
            });
            user.socket?.on(
                "lobbyTypeChange",
                (code: string, name: string, lobbyType: LobbyType) => {
                    if (this.owner.name === name) {
                        this.settings.lobbyType = lobbyType;
                        this.context.io.to(code).emit(
                            "lobbyData",
                            Array.from(this.users.values()).map(
                                (user) => user.name
                            ),
                            this.settings,
                            this.owner.name
                        );
                    }
                }
            );
            user.socket?.on(
                "gameTypeChange",
                (code: string, name: string, gameType: GameType) => {
                    if (this.owner.name === name) {
                        this.settings.game = gameType;
                        this.match.gameType = gameType;
                        this.context.io.to(code).emit(
                            "lobbyData",
                            Array.from(this.users.values()).map(
                                (user) => user.name
                            ),
                            this.settings,
                            this.owner.name
                        );
                    }
                }
            );
            user.socket?.on("quizChange", (id: string) => {
                if (this.owner.name === user.name) this.match.quiz = id;
            });
        });
    }

    /**
     * @returns Whether the adding was successful or not.
     */
    public addUser(user: UserInLobby): boolean {
        if (this.users.size < this.settings.maxUsers) {
            this.users.set(user.userId, { ...user, isConnected: true });
            return true;
        }
        return false;
    }

    public removeUser(userId: string): void {
        this.users.delete(userId);
    }

    /**
     * @param userId Id of the disconnected user.
     */
    public handleDisconnect(userId: string): void {
        const user = this.users.get(userId);
        if (user) {
            user.isConnected = false;
            user.isReady = false;
            user.socket = undefined;
            this.context.io.to(this.code).emit("userDisconnect", user.name)
        }
    }

    public reconnectUser(userId: string, socket: Socket): void {
        const user = this.users.get(userId);
        if (user) {
            user.isConnected = true;
            user.socket = socket;
            this.context.io.to(this.code).emit("userReconnect", user.name)
        }
    }

    public getUserCount() {
        return this.users.size;
    }

    /**
     * @returns Whether the user is in the lobby or not.
     */
    public hasUser(userId: string): boolean {
        return this.users.has(userId);
    }

    /**
     * @returns The users from this lobby.
     */
    public getUsers(): UserInLobby[] {
        return Array.from(this.users.values());
    }

    /**
     * @returns Whether the lobby is full or not.
     */
    public isFull(): boolean {
        return this.users.size >= this.settings.maxUsers;
    }

    public matchRoundSet(round: number) {
        this.match.round = round;
    }

    public matchStart() {
        this.match.start(this.users);
    }
}
