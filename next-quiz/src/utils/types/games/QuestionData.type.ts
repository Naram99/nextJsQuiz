import { AnswerData } from "./AnswerData.type";

export type QuestionData = {
    question: string;
    answer: AnswerData;
    pictureSrc?: string;
};
