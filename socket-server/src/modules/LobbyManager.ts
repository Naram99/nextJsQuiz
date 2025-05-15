import { UserInLobby } from "../utils/type/UserInLobby.type";
import Lobby from "./Lobby";

export default class LobbyManager {
    // TODO: Socket emit-ek mindenhová!

    private lobbies: Map<string, Lobby> = new Map();

    /**
     * createLobby
     */
    public createLobby(code: string, userId: string): Lobby {
        const lobby = new Lobby(code, userId);
        this.lobbies.set(code, lobby);
        return lobby;
    }

    public deleteLobby(code: string): void {
        this.lobbies.delete(code);
    }

    public checkIfLobbyExists(code: string): boolean {
        return this.lobbies.has(code);
    }

    public addUserToLobby(user: UserInLobby, lobbyCode: string): void {
        this.lobbies.get(lobbyCode)?.addUser(user);
    }

    public removeUserFromLobby(user: UserInLobby, lobbyCode: string): void {
        this.lobbies.get(lobbyCode)?.removeUser(user.userId);
        if (!this.lobbies.get(lobbyCode)?.hasUser(this.lobbies.get(lobbyCode)!.owner))
            this.lobbies.delete(lobbyCode);
    }
}
