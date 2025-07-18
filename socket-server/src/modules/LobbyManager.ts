import ServerContext from "../utils/ServerContext";
import { UserInLobby } from "../utils/type/UserInLobby.type";
import Lobby from "./Lobby";

export default class LobbyManager {
    // TODO: Socket emit-ek mindenhová!
    constructor(private context: ServerContext) {}

    private lobbies: Map<string, Lobby> = new Map();

    /**
     * createLobby
     */
    public createLobby(code: string, user: UserInLobby): Lobby {
        const lobby = new Lobby(code, user, this.context);
        this.lobbies.set(code, lobby);
        return lobby;
    }

    public deleteLobby(code: string): void {
        this.lobbies.delete(code);
    }

    public checkIfLobbyExists(code: string): boolean {
        return this.lobbies.has(code);
    }

    // TODO: Add user to socket room.
    public addUserToLobby(user: UserInLobby, lobbyCode: string): boolean {
        if (this.lobbies.get(lobbyCode)?.addUser(user)) {
            user.socket?.join(lobbyCode);
            return true;
        }
        return false;
    }

    // TODO: Remove User from socket rooms
    public removeUserFromLobby(user: UserInLobby, lobbyCode: string): void {
        this.lobbies.get(lobbyCode)?.removeUser(user.userId);
        user.socket?.leave(lobbyCode);
        if (
            !this.lobbies
                .get(lobbyCode)
                ?.hasUser(this.lobbies.get(lobbyCode)!.owner.userId)
        )
            this.lobbies.delete(lobbyCode);
    }

    public removeUserFromAllLobbies(user: UserInLobby) {
        for (const [code, lobby] of Array.from(this.lobbies.entries())) {
            lobby.removeUser(user.userId);
            user.socket?.leave(code);
            if (!lobby.hasUser(lobby.owner.userId)) this.lobbies.delete(code);
        }
    }

    public lobbySettings(code: string) {
        return this.lobbies.get(code)?.settings;
    }

    public lobbyUsers(code: string): string[] {
        if (this.lobbies.has(code)) {
            return Array.from(
                this.lobbies
                    .get(code)!
                    .getUsers()
                    .map((user) => user.name)
            );
        } else return [];
    }

    public get lobbiesData(): Map<string, Lobby> {
        return this.lobbies;
    }
}
