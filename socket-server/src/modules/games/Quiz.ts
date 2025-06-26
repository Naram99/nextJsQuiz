import QuizGame from "../../utils/interface/QuizGame.interface";
import ServerContext from "../../utils/ServerContext";
import { QuizFullData } from "../../utils/type/quiz/QuizFullData.type";
import { QuizSettings } from "../../utils/type/settings/QuizSettings.type";
import { UserInLobby } from "../../utils/type/UserInLobby.type";
import Question from "./quiz/Question";
import selectQuiz from "./quiz/selectQuiz";

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
    private question?: Question;

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
    }
    start(): void {
        this.emitUserData();
    }

    public reconnectSocket(): void {
        this.emitUserData();
    }

    private emitUserData(): void {
        console.log(this.players);

        const startData: Map<
            string,
            { ready: boolean; score: number; correct: boolean | null }
        > = new Map();
        this.players.forEach((user, userId) => {
            startData.set(user.name, {
                ready: user.isReady,
                score: user.score,
                correct: user.correct!,
            });
        });

        this.context.emitMap(this.id, "quiz:playerData", startData);
    }

    private socketListenerSetup(): void {
        this.players.forEach((user) => {
            user.socket?.removeAllListeners("quiz:requestData");
            user.socket?.removeAllListeners("quiz:answer");
            user.socket?.removeAllListeners("quiz:handRaise");
            user.socket?.removeAllListeners("quiz:selectQuestion");

            user.socket?.on("quiz:requestData", (id: string) => {
                this.emitUserData();
            });

            user.socket?.on("quiz:handRaise", (name: string) => {
                if (user.correct === null) this.question?.handleHandRaise(name);
            });

            user.socket?.on(
                "quiz:answer",
                (answer: number | string | string[]) => {
                    this.question?.handleAnswer(user.name, answer);
                }
            );

            user.socket?.on("quiz:selectQuestion", (questionId: string) => {
                this.fullData.categories.forEach((category, index) => {
                    category.questions.forEach((question, ind) => {
                        if (question.id === questionId)
                            this.fullData.categories[index].questions[
                                ind
                            ].used = true;
                        this.question = new Question(
                            this.context,
                            this.id,
                            this.fullData.categories[index].questions[ind]
                        );
                    });
                });
            });
        });
    }
}
