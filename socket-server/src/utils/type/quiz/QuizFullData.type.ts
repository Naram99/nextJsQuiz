import { CategoryData } from "./CategoryData.type";
import { QuestionData } from "./QuestionData.type";

export type QuizFullData = {
    owner: string;
    type: string;
    hasCategories: boolean;
    // questions: QuestionData[] | { [categoryId: string]: QuestionData[] };
    categories: CategoryData[];
};
