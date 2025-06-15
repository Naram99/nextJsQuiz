export type QuestionData = {
    question: string;
    answer: string | number | string[];
    type: "singleAnswer" | "typeGuess" | "selectGuess" | "multiSelect";
    pictureSrc: string | null;
    points: number;
    multipleCorrect: boolean;
};
