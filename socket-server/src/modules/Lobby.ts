import { Socket } from "socket.io";
import { LobbySettings } from "../utils/interface/LobbySettings.interface";
import { UserInLobby } from "../utils/type/UserInLobby.type";
import Match from "./Match";
import ServerContext from "../utils/ServerContext";

export default class Lobby {
    private users: Map<string, UserInLobby> = new Map();
    public settings: LobbySettings = {
        lobbyType: "open",
        minUsers: 2,
        maxUsers: 2,
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
            user.socket = undefined;
        }
    }

    public reconnectUser(userId: string, socket: Socket): void {
        const user = this.users.get(userId);
        if (user) {
            user.isConnected = true;
            user.socket = socket;
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
