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
    confirm: false;
}

type GuessNumberAnswerData = {
    text: string;
    type: "guessNumber"
    confirm: false
}

type GuessDateAnswerData = {
    text: string;
    type: "guessDate"
    confirm: true;
}

export type MultiSelectAnswerData = {
    text: string;
    type: "multiSelect"
    selectType: "champion" | "event" | "car"
    amount: number
    confirm: true
}
