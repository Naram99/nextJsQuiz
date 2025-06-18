export type QuestionData = {
    question: string;
    answer: AnswerData;
    pictureSrc?: string;
};

export type AnswerData = 
    | HandRaiseAnswerData
    | SingleAnswerData 
    | GuessNumberAnswerData 
    | GuessDateAnswerData 
    | MultiSelectAnswerData

type HandRaiseAnswerData = {
    text: string;
    type: "handRaise";
    confirm: false;
}

type SingleAnswerData = {
    text: string;
    type: "single"
    field: "text"
    confirm: false;
}

type GuessNumberAnswerData = {
    text: string;
    type: "guessNumber"
    field: "number"
    confirm: false
}

type GuessDateAnswerData = {
    text: string;
    type: "guessDate"
    field: "date"
    confirm: true;
}

type MultiSelectAnswerData = {
    text: string;
    type: "multiSelect"
    field: "select"
    selectType: "champion" | "event"
    amount: number
    confirm: true
}