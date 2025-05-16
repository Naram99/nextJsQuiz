import { UserInLobby } from "../utils/type/UserInLobby.type";
import Lobby from "./Lobby";

export default class LobbyManager {
    // TODO: Socket emit-ek mindenhová!

    private lobbies: Map<string, Lobby> = new Map();

    /**
     * createLobby
     */
    public createLobby(code: string, user: UserInLobby): Lobby {
        const lobby = new Lobby(code, user);
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
        if (this.lobbies.get(lobbyCode)?.addUser(user)) return true;
        return false;
            
    }

    // TODO: Remove User from socket rooms
    public removeUserFromLobby(user: UserInLobby, lobbyCode: string): void {
        this.lobbies.get(lobbyCode)?.removeUser(user.userId);
        if (!this.lobbies.get(lobbyCode)?.hasUser(this.lobbies.get(lobbyCode)!.owner.userId))
            this.lobbies.delete(lobbyCode);
    }

    public removeUserFromAllLobbies(user: UserInLobby) {
        for (const [code, lobby] of Array.from(this.lobbies.entries())) {
            lobby.removeUser(user.userId);
            if (!lobby.hasUser(lobby.owner.userId))
                this.lobbies.delete(code);
        }
    }
}
