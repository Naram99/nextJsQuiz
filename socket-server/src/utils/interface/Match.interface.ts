import Quiz from "../../modules/games/Quiz";
import TicTacToe from "../../modules/games/TicTacToe";
import { GameType } from "../type/GameType.type";
import { UserInLobby } from "../type/UserInLobby.type";

export interface MatchInterface {
    id: string;
    players: Map<string, UserInLobby>;
    gameType: GameType;
    game: TicTacToe | Quiz | null;
    playerScore: Map<string, number>;

    start(): void;
    setGameType(gt: GameType): void;
    updateScore(player: string, score: number): void;
}
