import { GameState } from "./GameState.interface";

export interface TicTacToeGameState extends GameState {
    board: string[][];
}
