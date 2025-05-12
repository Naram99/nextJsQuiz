import { Game } from "./Game.interface";

export interface TicTacToeGame extends Game {
    handleMove(index: number): void;
}
