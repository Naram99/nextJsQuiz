import { CategoryData } from "./type/quiz/CategoryData.type";

export const fullTestQuiz: CategoryData[] = [
    {
        id: "cat1",
        name: "Cat1",
        iconsPath: "/quiz/top/",
        questions: [
            {
                id: "top1",
                question:
                    "Nevezz meg két hőst, akinek a neve C betűvel kezdődik!",
                used: false,
                answer: {
                    type: "multiSelect",
                    text: [
                        "Chogath",
                        "Caitlyn",
                        "Camille",
                        "Corki",
                        "Cassiopeia",
                    ],
                    selectType: "champion",
                    amount: 2,
                    confirm: true,
                    pointsPerCorrect: true,
                    points: 10,
                },
            },
            {
                id: "top2",
                question: "Mikor spawnolnak a Voidgrub-ok?",
                used: false,
                pictureSrc: "/quiz/ai/grubs.jpg",
                answer: {
                    text: "8:00",
                    type: "handRaise",
                    confirm: false,
                    points: 20,
                    pictureSrc: ["/quiz/ai/grub.jpg", "/quiz/ai/grub.jpg"],
                },
            },
        ],
    },
    {
        id: "cat2",
        name: "Cat2",
        iconsPath: "/quiz/jungle/",
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
