import { CategoryData } from "./type/quiz/CategoryData.type";

export const fullTestQuiz: CategoryData[] = [
    {
        id: "cat1",
        name: "Cat1",
        iconsPath: "/quiz/top",
        questions: [
            {
                id: "top1",
                question:
                    "Nevezz meg egy hőst, akinek a neve C betűvel kezdődik!",
                used: false,
                answer: {
                    type: "multiSelect",
                    text: [
                        "ChoGath",
                        "Caitlyn",
                        "Camille",
                        "Corki",
                        "Cassiopeia",
                    ],
                    selectType: "champion",
                    amount: 1,
                    confirm: true,
                    pointsPerCorrect: true,
                    points: 10,
                },
            },
            {
                id: "top2",
                question: "Mikor spawnolnak a Voidgrub-ok?",
                used: false,
                answer: {
                    text: "8:00",
                    type: "handRaise",
                    confirm: false,
                    points: 20,
                },
            },
        ],
    },
    {
        id: "cat2",
        name: "Cat2",
        iconsPath: "/quiz/jungle",
        questions: [
            {
                id: "jng1",
                question: "Hány különböző sárkány van?",
                used: false,
                answer: {
                    text: 7,
                    type: "guessNumber",
                    points: 10,
                    confirm: false,
                    pictureSrc: "",
                },
            },
            {
                id: "jng2",
                question: "Mikor volt a LoL hivatalos release-je?",
                used: false,
                answer: {
                    text: 1254355200000,
                    type: "guessDate",
                    points: 20,
                    confirm: true,
                    pictureSrc: [],
                },
            },
        ],
    },
];
