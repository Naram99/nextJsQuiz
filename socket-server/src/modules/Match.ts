import { MatchInterface } from "../utils/interface/Match.interface";
import { GameType } from "../utils/type/GameType.type";
import { UserInLobby } from "../utils/type/UserInLobby.type";
import Quiz from "./games/Quiz";
import TicTacToe from "./games/TicTacToe";

export default class Match implements MatchInterface {
    public game: TicTacToe | Quiz | null = null;
    public gameType: GameType = "tictactoe";
    public playerScore: Map<string, number> = new Map();

    constructor(public readonly id: string, public readonly players: Map<string, UserInLobby>) {
        players.forEach((user) => this.playerScore.set(user.name, 0));
    }

    start(): void {}

    public setGameType(gt: GameType): void {
        switch (gt) {
            case "tictactoe":
                this.game = new TicTacToe(this.id, { O: "", X: "" }, this.updateScore);
                break;

            case "quiz":
                this.game = new Quiz(this.id);
                break;
        }
    }

    updateScore(player: string, score: number): void {
        this.playerScore.set(player, (this.playerScore.get(player) ?? 0) + score);
    }
}
