import ServerContext from "../../../utils/ServerContext";
import { QuestionData } from "../../../utils/type/quiz/QuestionData.type";
import { UserInLobby } from "../../../utils/type/UserInLobby.type";

export default class Question {
    public handRaiseOrder: string[] = [];
    public answers: { [index: string]: number | string | string[] } = {};

    constructor(
        private context: ServerContext,
        private id: string,
        private players: Map<string, UserInLobby>,
        public fullData: QuestionData,
        public emitAnswers: (data: {
            [index: string]: number | string | string[];
        }) => void
    ) {
        console.log(fullData);
        context.io.to(id).emit("quiz:questionData", fullData);
    }

    public handleAnswer(
        player: string,
        answer: number | string | string[]
    ): void {
        this.answers[player] = answer;
        console.log(this.answers);
    }

    public evaluateAnswers(): { id: string; points: number }[] {
        console.log("Evaluating answers");
        this.emitAnswers(this.answers);

        let corrects: { id: string; points: number }[] = [];

        switch (this.fullData.answer.type) {
            case "guessDate":
            case "guessNumber":
                corrects = this.findClosestNumber();
                break;

            case "multiSelect":
                corrects = this.evaluateMultiSelect();
                break;

            default:
                break;
        }
        console.log(corrects);
        return corrects;
    }

    public handleHandRaise(user: string): void {
        if (!this.handRaiseOrder.includes(user)) this.handRaiseOrder.push(user);
        console.log(this.handRaiseOrder);

        this.context.io
            .to(this.id)
            .emit("quiz:handRaiseOrder", this.handRaiseOrder);
    }

    public handleHandRaiseAnswer(
        correct: boolean
    ): { id: string; points: number } | undefined {
        const player = this.handRaiseOrder.shift();
        if (player && correct)
            return { id: player, points: this.fullData.answer.points };
        else {
            this.context.io
                .to(this.id)
                .emit("quiz:handRaiseOrder", this.handRaiseOrder);
            return undefined;
        }
    }

    private findClosestNumber(): { id: string; points: number }[] {
        let closest: { id: string; points: number }[] = [];
        let minDiff = Infinity;

        for (const [id, guess] of Object.entries(this.answers)) {
            if (
                typeof guess === "number" &&
                typeof this.fullData.answer.text === "number"
            ) {
                const diff = Math.abs(guess - this.fullData.answer.text);
                if (diff < minDiff) {
                    minDiff = diff;
                    closest = [{ id: id, points: this.fullData.answer.points }];
                } else if (diff === minDiff) {
                    closest.push({
                        id: id,
                        points: this.fullData.answer.points,
                    });
                }
            }
        }

        return closest;
    }

    private evaluateMultiSelect(): { id: string; points: number }[] {
        const pointsObj: { id: string; points: number }[] = [];
        const answerText = this.fullData.answer.text;
        for (const [id, guesses] of Object.entries(this.answers)) {
            const check: { [index: string]: number } = {};
            if (Array.isArray(guesses) && Array.isArray(answerText)) {
                guesses.forEach((guess) => {
                    if (answerText.includes(guess)) {
                        check[guess] = this.fullData.answer.points;
                    }
                });
            }
            let points = 0;
            if (Object.values(check).length > 0) {
                points = Object.values(check).reduce(
                    (prev, curr) => prev + curr
                );
            }
            pointsObj.push({
                id: id,
                points: points,
            });
        }

        return pointsObj;
    }
}
