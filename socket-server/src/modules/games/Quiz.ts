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
        this.socketListenerSetup();
        // this.selectNextQuestion([]); Átírni máshová, indítás utánra, előbb fut le, mint a listener setup a túloldalon
    }

    public reconnectSocket(): void {
        this.emitUserData();
        this.socketListenerSetup();
    }

    private emitUserData(): void {
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

        this.context.emitMap(
            this.id,
            "quiz:playerData",
            startData,
            this.fullData.owner
        );
    }

    private socketListenerSetup(): void {
        this.players.forEach((user) => {
            user.socket?.removeAllListeners("quiz:requestData");
            user.socket?.removeAllListeners("quiz:answer");
            user.socket?.removeAllListeners("quiz:handRaise");
            user.socket?.removeAllListeners("quiz:selectQuestion");
            user.socket?.removeAllListeners("quiz:admin:start");
            user.socket?.removeAllListeners("quiz:admin:handRaiseCorrect");
            user.socket?.removeAllListeners("quiz:admin:evaluate");
            user.socket?.removeAllListeners("quiz:admin:nextQuestion");

            user.socket?.on("quiz:admin:start", () => {
                this.selectNextQuestion([]);
            });

            user.socket?.on("quiz:requestData", (id: string) => {
                this.emitUserData();
            });

            user.socket?.on("quiz:handRaise", () => {
                if (user.correct === null)
                    this.question?.handleHandRaise(user.name);
            });

            user.socket?.on(
                "quiz:admin:handRaiseCorrect",
                (correct: boolean) => {
                    const activePlayer =
                        this.question?.handleHandRaiseAnswer(correct);
                    if (correct && activePlayer) {
                        this.players.forEach((player) => {
                            if (player.name === activePlayer.id) {
                                activePlayer.id = player.userId;
                                this.players.set(player.userId, {
                                    ...player,
                                    correct: true,
                                });
                            }
                        });
                        this.emitUserData();
                        this.finishQuestion([activePlayer]);
                        // setTimeout(
                        //     () => this.updateScores([activePlayer]),
                        //     5000
                        // );
                        // setTimeout(
                        //     () => this.selectNextQuestion([activePlayer]),
                        //     5000
                        // );
                    }
                }
            );

            user.socket?.on(
                "quiz:answer",
                (answer: number | string | string[]) => {
                    if (!this.players.get(user.userId)?.correct) {
                        this.question?.handleAnswer(user.userId, answer);
                        this.players.set(user.userId, {
                            ...this.players.get(user.userId)!,
                            correct: true,
                        });
                        this.emitUserData();

                        if (
                            Object.values(this.question!.answers).length ===
                            this.players.size - 2
                        ) {
                            const corrects = this.question!.evaluateAnswers();
                            this.finishQuestion(corrects);
                            // setTimeout(() => this.updateScores(corrects), 5000);
                            // setTimeout(
                            //     () => this.selectNextQuestion(corrects),
                            //     5000
                            // );
                        }
                    }
                }
            );

            user.socket?.on("quiz:selectQuestion", (questionId: string) => {
                console.log(questionId);

                this.fullData.categories.forEach((category, index) => {
                    category.questions.forEach((question, ind) => {
                        if (question.id === questionId) {
                            this.fullData.categories[index].questions[
                                ind
                            ].used = true;

                            this.question = new Question(
                                this.context,
                                this.id,
                                this.fullData.categories[index].questions[ind]
                            );
                        }
                    });
                });
            });

            user.socket?.on("quiz:admin:evaluate", () => {
                const corrects = this.question!.evaluateAnswers();
                this.finishQuestion(corrects);
                // setTimeout(() => this.updateScores(corrects), 5000);
                // setTimeout(() => this.selectNextQuestion(corrects), 5000);
            });

            user.socket?.on("quiz:admin:nextQuestion", () => {
                this.finishQuestion([]);
            });
        });
    }

    private finishQuestion(data: { id: string; points: number }[]) {
        this.context.io.to(this.id).emit("quiz:showdown");
        setTimeout(() => this.updateScores(data), 5000);
        setTimeout(() => this.selectNextQuestion(data), 5000);
    }

    private updateScores(data: { id: string; points: number }[]): void {
        data.forEach((obj) => {
            this.players.set(obj.id, {
                ...this.players.get(obj.id)!,
                score: this.players.get(obj.id)!.score + obj.points,
            });
        });
        this.resetCorrect();
        this.emitUserData();
    }

    private resetCorrect(): void {
        this.players.forEach((user, userId) => {
            this.players.set(userId, { ...user, correct: null });
        });
    }

    private selectNextQuestion(data: { id: string; points: number }[]) {
        let selector = "";
        const order = data.sort((a, b) => a.points - b.points);
        if (order.length > 0) {
            selector = order[0].id;
        } else {
            this.players.forEach((player) => {
                if (
                    player.name !== "display" &&
                    player.name !== this.fullData.owner
                )
                    selector = player.userId;
            });
        }
        console.log(this.players.get(selector)?.name);
        this.context.io
            .to(this.id)
            .emit(
                "quiz:nextQuestionSelect",
                this.players.get(selector)?.name,
                this.fullData.categories
            );
    }
}
