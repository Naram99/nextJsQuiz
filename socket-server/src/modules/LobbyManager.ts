import Lobby from "./Lobby";

export default class LobbyManager {
    private lobbies: Map<string, Lobby> = new Map();

    /**
     * createLobby
     */
    public createLobby(code: string): Lobby {
        const lobby = new Lobby(code);
        this.lobbies.set(code, lobby);
        return lobby;
    }
}
