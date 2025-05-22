import { GameType } from "../type/GameType.type";
import { LobbyType } from "../type/LobbyType.type";

export interface LobbySettings {
    lobbyType: LobbyType;
    maxUsers: number;
    minUsers: number;
    game: GameType
}
