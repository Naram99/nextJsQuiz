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
    private rounds: number = 1;
    private currentRound: number = 1;
    private quizId: string = "";

    constructor(public readonly id: string, private context: ServerContext) {}

    public async start(players: Map<string, UserInLobby>): Promise<void> {
        this.players = players;
        for (const [id, user] of this.players.entries()) {
            this.players.set(id, { ...user, score: 0, correct: null });
        }
        await this.setGameType(this.gameType);
        this.game!.start();
    }

    public nextRound() {
        this.currentRound++;
        if (this.currentRound <= this.rounds) this.game!.start();
    }

    public async setGameType(gt: GameType): Promise<void> {
        switch (gt) {
            case "tictactoe":
                const playerArray = Array.from(this.players.values());
                this.game = new TicTacToe(
                    this.context,
                    this.id,
                    { O: playerArray[0], X: playerArray[1] },
                    this.updateScore,
                    this.rounds
                );
                break;

            case "quiz":
                this.game = new Quiz(
                    this.context,
                    this.id,
                    this.quizId,
                    this.players,
                    this.updateScore
                );
                break;

            case "skinquiz":
                this.game = new SkinQuiz(
                    this.context,
                    this.id,
                    this.players,
                    this.updateScore,
                    this.rounds
                );

                break;
        }

        await this.game!.initialize();
    }

    updateScore = (dataObj: { player: string; score: number }[]): void => {
        console.log("updateScore");

        dataObj.forEach((data) => {
            this.players.set(data.player, {
                ...this.players.get(data.player)!,
                score: (this.players.get(data.player)?.score ?? 0) + data.score,
            });
        });

        const sendData: Map<string, number> = new Map();
        this.players.forEach((player) => {
            sendData.set(player.name, player.score);
        });

        this.context.emitMap(this.id, "scoreUpdate", sendData);
        if (this.currentRound < this.rounds)
            setTimeout(() => this.nextRound(), 3000);
        else
            setTimeout(
                () => this.context.io.to(this.id).emit("matchEnd"),
                3000
            );
    };

    public reconnectSocket(): void {
        this.game?.reconnectSocket()
    }

    public set round(round: number) {
        this.rounds = round;
    }

    public set quiz(id: string) {
        this.quizId = id;
    }
}
