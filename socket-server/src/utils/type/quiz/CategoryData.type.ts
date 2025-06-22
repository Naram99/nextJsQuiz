import { QuestionData } from "./QuestionData.type";

export type CategoryData = {
    id: string;
    name: string;
    iconsPath: string;
    questions: QuestionData[];
};
