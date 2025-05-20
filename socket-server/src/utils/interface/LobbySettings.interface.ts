import { LobbyType } from "../type/LobbyType.type";

export interface LobbySettings {
    lobbyType: LobbyType;
    maxUsers: number;
    minUsers: number;
    game: "quiz" | "tictactoe";
}
