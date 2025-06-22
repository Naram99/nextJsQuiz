import ServerContext from "../../../utils/ServerContext";
import { CategoryData } from "../../../utils/type/quiz/CategoryData.type";

export default class WinnerSelectQuiz {
    constructor(
        public readonly context: ServerContext,
        public categories: CategoryData[]
    ) {}
}
