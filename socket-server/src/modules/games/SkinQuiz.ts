import SkinRandomizer from "../SkinRandomizer";
import { UserInLobby } from "../../utils/type/UserInLobby.type";
import SkinQuizRound from "./SkinQuizRound";
import ServerContext from "../../utils/ServerContext";

export default class SkinQuiz {
    private randomizer: SkinRandomizer;
    public settings = {
        minPlayers: 1,
        maxPlayers: 20,
        rounds: 5,
        levelPerRound: 5,
    };
    public quizRound: SkinQuizRound | null = null;

    constructor(
        private context: ServerContext,
        public readonly id: string,
        public readonly players: Map<string, UserInLobby>,
        public readonly updateScore: (data: { player: string; score: number }[]) => void,
        rounds: number
    ) {
        this.randomizer = new SkinRandomizer(rounds);
        this.settings.rounds = rounds;
    }

    public async initialize() {
        await this.randomizer.start();
    }

    private cleanupRound() {
        if (this.quizRound) {
            this.players.forEach((player) => {
                player.socket?.removeAllListeners("skinQuiz:requestData");
                player.socket?.removeAllListeners("skinQuiz:answer");
            });
            this.quizRound = null;
        }
    }

    public start(): void {
        this.cleanupRound();
        this.quizRound = new SkinQuizRound(
            this.context,
            this.id,
            this.players,
            this.updateScore,
            this.settings.levelPerRound,
            this.randomizer.skinArray.pop()!
        );
        //this.context.io.to(this.id).emit("");
    }
}
