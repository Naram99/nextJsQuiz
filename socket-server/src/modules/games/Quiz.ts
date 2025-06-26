import QuizGame from "../../utils/interface/QuizGame.interface";
import ServerContext from "../../utils/ServerContext";
import { QuizFullData } from "../../utils/type/quiz/QuizFullData.type";
import { QuizSettings } from "../../utils/type/settings/QuizSettings.type";
import { UserInLobby } from "../../utils/type/UserInLobby.type";
import LinearQuiz from "./quiz/LinearQuiz";
import selectQuiz from "./quiz/selectQuiz";
import WinnerSelectQuiz from "./quiz/WinnerSelectQuiz";

export default class Quiz implements QuizGame {
    public readonly settings: QuizSettings = {
        minPlayers: 2,
        maxPlayers: 10,
    };
    private fullData: QuizFullData = {
        owner: "",
        type: "",
        hasCategories: false,
        categories: [],
    };
    private quizType: LinearQuiz | WinnerSelectQuiz = new LinearQuiz([]);

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
        const result = await selectQuiz(this.quizId);
        if (result.length === 0) {
            throw new Error(`Quiz with id ${this.quizId} not found`);
        }
        this.fullData = result[0] as QuizFullData;
        console.log(this.fullData);

        if (this.fullData.hasCategories) {
            this.quizType = new WinnerSelectQuiz(
                this.context,
                this.fullData.categories
            );
        }
    }
    start(): void {}

    public reconnectSocket(): void {}
}
