import { TicTacToePlayer } from "../type/TicTacToePlayer.type";
import { TicTacToeSettings } from "../type/settings/TicTacToeSettings.type";

export interface TicTacToeGame {
    id: string;
    settings: TicTacToeSettings;
    players: Record<TicTacToePlayer, string>;

    start(): void;
    handleMove(index: number): void;
    checkGameEnd(): boolean;
}
