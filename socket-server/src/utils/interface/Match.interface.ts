import Quiz from "../../modules/games/Quiz";
import SkinQuiz from "../../modules/games/SkinQuiz";
import TicTacToe from "../../modules/games/TicTacToe";
import { GameType } from "../type/GameType.type";
import { UserInLobby } from "../type/UserInLobby.type";

export interface MatchInterface {
    id: string;
    players: Map<string, UserInLobby>;
    gameType: GameType;
    game: TicTacToe | Quiz | SkinQuiz | null;

    start(players: Map<string, UserInLobby>): void;
    setGameType(gt: GameType): void;
    updateScore(data: { player: string; score: number }[]): void;
}
