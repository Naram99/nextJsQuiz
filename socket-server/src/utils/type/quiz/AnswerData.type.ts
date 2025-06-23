export type AnswerData = {
    text: string | number | string[];
} & (
    | HandRaiseAnswerData
    | SingleAnswerData
    | GuessNumberAnswerData
    | GuessDateAnswerData
    | MultiSelectAnswerData
);

type HandRaiseAnswerData = {
    type: "handRaise";
    confirm: false;
};

type SingleAnswerData = {
    type: "single";
    confirm: false;
};

type GuessNumberAnswerData = {
    type: "guessNumber";
    confirm: false;
};

type GuessDateAnswerData = {
    type: "guessDate";
    confirm: true;
};

export type MultiSelectAnswerData = {
    type: "multiSelect";
    selectType: "champion" | "event" | "car";
    amount: number;
    confirm: true;
};
