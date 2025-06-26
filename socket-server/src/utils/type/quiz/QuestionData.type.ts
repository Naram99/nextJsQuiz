import { AnswerData } from "./AnswerData.type";

export type QuestionData = {
    id: string;
    question: string;
    answer: AnswerData;
    pictureSrc?: string;
    used: boolean;
};
