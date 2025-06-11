import SkinRandomizer from "../SkinRandomizer";
import {UserInLobby} from "../../utils/type/UserInLobby.type";
import SkinQuizRound from "./SkinQuizRound";

export default class SkinQuiz {
    private randomizer: SkinRandomizer;
    public settings = {
        minPlayers: 1,
        maxPlayers: 20,
        rounds: 5,
        levelPerRound: 5,
    }
    public quizRound: SkinQuizRound | null = null;

    constructor(
        public readonly id: string,
        public readonly players: Map<string, UserInLobby>,
        public readonly updateScore: (player: string, score: number) => void,
        rounds: number,
    ) {
        this.randomizer = new SkinRandomizer(rounds);
        this.settings.rounds = rounds;
    }
    
    public async initialize() {
        await this.randomizer.start();
    }
    
    public start(): void {
        this.quizRound = new SkinQuizRound(
            this.id,
            this.players,
            this.updateScore,
            this.settings.levelPerRound,
            this.randomizer.skinArray.pop()!
        )
    }

    private nextRound() {}
}
