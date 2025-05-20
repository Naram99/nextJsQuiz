import { lobbyType } from "../types/lobbyType.type";


export interface LobbySettings {
    lobbyType: lobbyType;
    maxUsers: number;
    minUsers: number;
    game: "quiz" | "tictactoe";
}
