import { MatchInterface } from "../utils/interface/Match.interface";
import ServerContext from "../utils/ServerContext";
import { GameType } from "../utils/type/GameType.type";
import { UserInLobby } from "../utils/type/UserInLobby.type";
import Quiz from "./games/Quiz";
import SkinQuiz from "./games/SkinQuiz";
import TicTacToe from "./games/TicTacToe";

export default class Match implements MatchInterface {
    public game: TicTacToe | Quiz | SkinQuiz | null = null;
    public gameType: GameType = "tictactoe";
    public players: Map<string, UserInLobby> = new Map();

    constructor(public readonly id: string, private context: ServerContext) {}

    start(players: Map<string, UserInLobby>): void {
        this.players = players;
        for (const [id, user] of this.players.entries()) {
            this.players.set(id, {...user, score: 0})
        }
        this.setGameType(this.gameType);
        this.game!.start();
    }

    public setGameType(gt: GameType): void {
        switch (gt) {
            case "tictactoe":
                const playerArray = Array.from(this.players.values());
                this.game = new TicTacToe(
                    this.context,
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

    updateScore = (player: string, score: number): void => {
        this.players.set(
            player, 
            {
                ...this.players.get(player)!, 
                score: (this.players.get(player)!.score ?? 0) + score
            }
        );

        const sendData: Map<string, number> = new Map();
        this.players.forEach(player => {
            sendData.set(player.name, player.score);
        })
        console.log(sendData);
        // TODO: Map-ek átírása
        this.context.io.to(this.id).emit("scoreUpdate", sendData)
    }
}
