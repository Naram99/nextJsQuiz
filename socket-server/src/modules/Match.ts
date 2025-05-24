import { MatchInterface } from "../utils/interface/Match.interface";
import { GameType } from "../utils/type/GameType.type";
import Quiz from "./games/Quiz";
import TicTacToe from "./games/TicTacToe";

export default class Match implements MatchInterface {
    public game: TicTacToe | Quiz | null = null;

    constructor(public readonly id: string, public readonly gameType: GameType) {
        switch (gameType) {
            case "tictactoe":
                break;

            case "quiz":
                break;
        }
    }

    start(): void {}
}
