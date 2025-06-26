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

    public evaluateAnswers() {
        switch (this.fullData.answer.type) {
            case "guessDate":
                break;

            case "guessNumber":
                break;

            case "multiSelect":
                break;

            default:
                break;
        }
    }

    public handleHandRaise(user: string): void {
        this.handRaiseOrder.push(user);
        this.context.io
            .to(this.id)
            .emit("quiz:handRaiseOrder", this.handRaiseOrder);
    }
}
