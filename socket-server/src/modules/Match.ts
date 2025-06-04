import { MatchInterface } from "../utils/interface/Match.interface";
import { GameType } from "../utils/type/GameType.type";
import { TicTacToePlayer } from "../utils/type/TicTacToePlayer.type";
import { UserInLobby } from "../utils/type/UserInLobby.type";
import Quiz from "./games/Quiz";
import SkinQuiz from "./games/SkinQuiz";
import TicTacToe from "./games/TicTacToe";

export default class Match implements MatchInterface {
    public game: TicTacToe | Quiz | SkinQuiz | null = null;
    public gameType: GameType = "tictactoe";
    public playerScore: Map<string, number> = new Map();
    public players: Map<string, UserInLobby> = new Map();

    constructor(public readonly id: string) {}

    start(players: Map<string, UserInLobby>): void {
        this.players = players;
        players.forEach((user) => this.playerScore.set(user.name, 0));
    }

    public setGameType(gt: GameType): void {
        switch (gt) {
            case "tictactoe":
                const playerArray = Array.from(this.players.values());
                this.game = new TicTacToe(
                    this.id,
                    { O: playerArray[0], X: playerArray[1] },
                    this.updateScore
                );
                break;

            case "quiz":
                this.game = new Quiz(this.id);
                break;

            case "skinquiz":
                this.game = new SkinQuiz(this.id, 5, this.players);
                break;
        }
    }

    updateScore(player: string, score: number): void {
        this.playerScore.set(player, (this.playerScore.get(player) ?? 0) + score);
    }
}
