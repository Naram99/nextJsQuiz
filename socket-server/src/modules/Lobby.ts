import { Socket } from "socket.io";
import { LobbySettings } from "../utils/interface/LobbySettings.interface";
import { UserInLobby } from "../utils/type/UserInLobby.type";

export default class Lobby {
    private users: Map<string, UserInLobby> = new Map();
    public settings: LobbySettings = {
        lobbyType: "open",
        maxUsers: 2,
        game: "tictactoe",
    };

    constructor(public readonly code: string, public owner: string) {}

    /**
     * Adding a user to the lobby.
     * @param user User to be added.
     * @returns Whether the adding was successful or not.
     */
    public addUser(user: UserInLobby): boolean {
        if (this.users.size < this.settings.maxUsers) {
            this.users.set(user.userId, { ...user, isConnected: true });
            return true;
        }
        return false;
    }

    /**
     * Removing a user from the lobby.
     * @param userId Id of the user to be removed.
     */
    public removeUser(userId: string): void {
        this.users.delete(userId);
    }

    /**
     * Sets a user's status to disconnected.
     * @param userId Id of the disconnected user.
     */
    public handleDisconnect(userId: string): void {
        const user = this.users.get(userId);
        if (user) {
            user.isConnected = false;
            user.socket = undefined;
        }
    }

    /**
     * Reconnects a disconnected user to the lobby.
     * @param userId Id of the disconnected user.
     * @param socket The new socket connection of the user.
     */
    public reconnectUser(userId: string, socket: Socket): void {
        const user = this.users.get(userId);
        if (user) {
            user.isConnected = true;
            user.socket = socket;
        }
    }

    /**
     * @returns The number of users in the lobby.
     */
    public getUserCount() {
        return this.users.size;
    }

    /**
     * Determines if a user is in the lobby.
     * @param userId The id of the user.
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
}
