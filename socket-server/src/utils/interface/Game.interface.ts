import { LobbyType } from "../type/LobbyType.type";

export interface Game {
    id: string;
    lobbyType: LobbyType;
    players: string[];
}
