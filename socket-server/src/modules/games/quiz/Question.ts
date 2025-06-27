import ServerContext from "../../../utils/ServerContext";
import { QuestionData } from "../../../utils/type/quiz/QuestionData.type";

export default class Question {
    public handRaiseOrder: string[] = [];
    public answers: { [index: string]: number | string | string[] } = {};

    constructor(
        private context: ServerContext,
        private id: string,
        public fullData: QuestionData
    ) {}

    public handleAnswer(
        player: string,
        answer: number | string | string[]
    ): void {
        this.answers[player] = answer;
        console.log(this.answers);
    }

    public evaluateAnswers(): { id: string; points: number }[] {
        console.log("Evaluating answers");
        this.context.io.to(this.id).emit("quiz:allAnswers", this.answers);

        let corrects: { id: string; points: number }[] = [];

        switch (this.fullData.answer.type) {
            case "guessDate":
            case "guessNumber":
                corrects = this.findClosestNumber();
                break;

            case "multiSelect":
                break;

            default:
                break;
        }
        console.log(corrects);
        return corrects;
    }

    public handleHandRaise(user: string): void {
        this.handRaiseOrder.push(user);
        this.context.io
            .to(this.id)
            .emit("quiz:handRaiseOrder", this.handRaiseOrder);
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
        for (const [id, guesses] of Object.entries(this.answers)) {
        }

        return pointsObj;
    }
}
