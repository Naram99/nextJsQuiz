import { TicTacToePlayer } from "../type/TicTacToePlayer.type";
import { UserInLobby } from "../type/UserInLobby.type";
import { TicTacToeSettings } from "../type/settings/TicTacToeSettings.type";

export interface TicTacToeGame {
    id: string;
    settings: TicTacToeSettings;
    players: Record<TicTacToePlayer, UserInLobby>;
    onGameEnd: (player: string, score: number) => void;

    start(): void;
    handleMove(index: number): void;
    checkGameEnd(): TicTacToePlayer | "tie" | null;
}
