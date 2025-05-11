import { Game } from "./Game.interface";
import { GameSettings } from "./GameSettings.interface";
import { TicTacToeGameState } from "./TicTacToeGameState.interface";

export interface TicTacToeGame extends Game<GameSettings, TicTacToeGameState> {
    handleMove(x: number, y: number): void;
    validateMove(x: number, y: number): boolean;
    checkTie(): boolean;
}
