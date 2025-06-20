import QuizGame from "../../utils/interface/QuizGame.interface";
import ServerContext from "../../utils/ServerContext";
import { QuizFullData } from "../../utils/type/quiz/QuizFullData.type";
import { QuizSettings } from "../../utils/type/settings/QuizSettings.type";
import { UserInLobby } from "../../utils/type/UserInLobby.type";
import selectQuiz from "./quiz/selectQuiz";

export default class Quiz implements QuizGame {
    public readonly settings: QuizSettings = {
        minPlayers: 2,
        maxPlayers: 10,
    };
    private fullData: QuizFullData = {};

    constructor(
        private context: ServerContext,
        public readonly id: string,
        public readonly quizId: string,
        public readonly players: Map<string, UserInLobby>,
        public readonly updateScore: (
            data: { player: string; score: number }[]
        ) => void
    ) {}

    public async initialize(): Promise<void> {
        this.fullData = await selectQuiz(this.quizId);
    }
    start(): void {}
}
