import { TicTacToePlayer } from "../type/TicTacToePlayer.type";
import { UserInLobby } from "../type/UserInLobby.type";
import { TicTacToeSettings } from "../type/settings/TicTacToeSettings.type";

export interface TicTacToeGame {
    id: string;
    settings: TicTacToeSettings;
    players: Record<TicTacToePlayer, UserInLobby>;
    onGameEnd: (data: { player: string; score: number }[]) => void;

    initialize(): void;
    start(): void;
    handleMove(index: number): void;
    checkGameEnd(): TicTacToePlayer | "tie" | null;
}
