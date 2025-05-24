import Quiz from "../../modules/games/Quiz";
import TicTacToe from "../../modules/games/TicTacToe";
import { GameType } from "../type/GameType.type";

export interface MatchInterface {
    id: string;
    gameType: GameType;
    game: TicTacToe | Quiz | null;

    start(): void;
}
