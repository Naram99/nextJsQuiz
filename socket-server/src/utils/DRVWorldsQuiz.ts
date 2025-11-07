import { CategoryData } from "./type/quiz/CategoryData.type";

export const DRVQuizData: CategoryData[] = [
    {
        id: "cat1",
        name: "Worlds finals",
        iconsPath: "/quiz/top/",
        questions: [
            {
                id: "top1",
                question: "Hány különböző országban volt már Worlds döntő?",
                used: false,
                answer: {
                    type: "guessNumber",
                    text: 8,
                    confirm: false,
                    points: 10,
                },
            },
            {
                id: "top2",
                question:
                    "Melyik hős az egyetlen, amivel pentáztak Worlds döntőben?",
                used: false,
                answer: {
                    text: "Fiora (2020 Bin)",
                    type: "handRaise",
                    confirm: false,
                    points: 20,
                },
            },
            {
                id: "top3",
                question:
                    "Hány különböző játékos ellen játszott Faker Worlds döntőt?",
                used: false,
                answer: {
                    text: 30,
                    type: "guessNumber",
                    confirm: false,
                    points: 30,
                },
            },
        ],
    },
    {
        id: "cat2",
        name: "AI",
        iconsPath: "/quiz/jungle/",
        questions: [
            {
                id: "jng1",
                question: "Melyik skin lett átalakítva?",
                used: false,
                pictureSrc: "/quiz/ai/worlds/2.png",
                answer: {
                    text: "Jailbreak Graves",
                    type: "handRaise",
                    points: 10,
                    confirm: false,
                    pictureSrc: ["/quiz/ai/worlds/2.png"],
                },
            },
            {
                id: "jng2",
                question: "Melyik hősök lettek egybegyúrva?",
                used: false,
                pictureSrc: "/quiz/ai/worlds/4.png",
                answer: {
                    text: ["Corki", "Lulu"],
                    type: "multiSelect",
                    points: 10,
                    pointsPerCorrect: true,
                    confirm: true,
                    pictureSrc: ["/quiz/ai/worlds/4.png"],
                    amount: 2,
                    selectType: "champion",
                },
            },
            {
                id: "jng3",
                question: "Melyik skin lett átalakítva?",
                used: false,
                pictureSrc: "/quiz/ai/worlds/3.png",
                answer: {
                    text: "Hillbilly Gragas",
                    type: "handRaise",
                    points: 30,
                    confirm: false,
                    pictureSrc: ["/quiz/ai/worlds/3.png"],
                },
            },
        ],
    },
    {
        id: "cat3",
        name: "Riddles",
        iconsPath: "/quiz/mid/",
        questions: [
            {
                id: "mid1",
                question: "Kire utal a kép?",
                used: false,
                pictureSrc: "/quiz/ai/worlds/riddle1.png",
                answer: {
                    text: "AK (Kiss Ádám)",
                    type: "handRaise",
                    confirm: false,
                    points: 10,
                    pictureSrc: ["/quiz/ai/worlds/riddle1.png"],
                },
            },
            {
                id: "mid2",
                question: "Kire utal a kép?",
                used: false,
                pictureSrc: "/quiz/ai/worlds/riddle3.webp",
                answer: {
                    text: "Medic (Caster)",
                    type: "handRaise",
                    confirm: false,
                    points: 20,
                    pictureSrc: ["/quiz/ai/worlds/riddle3.webp"],
                },
            },
            {
                id: "mid3",
                question: "Kire utal a kép?",
                used: false,
                pictureSrc: "/quiz/ai/worlds/riddle2.webp",
                answer: {
                    text: "Vízicsacsi",
                    type: "handRaise",
                    confirm: false,
                    points: 30,
                    pictureSrc: ["/quiz/ai/worlds/riddle2.webp"],
                },
            },
        ],
    },
    {
        id: "cat4",
        name: "Worlds winners",
        iconsPath: "/quiz/bot/",
        questions: [
            {
                id: "bot1",
                question:
                    "Milyen role-t játszik az a játékos aki úgy nyert 2 Worlds döntőt, hogy sosem játszott az SKT/T1-ben?",
                used: false,
                answer: {
                    type: "handRaise",
                    text: "Support (BeryL)",
                    confirm: false,
                    points: 10,
                },
            },
            {
                id: "bot2",
                question: "Hány kínai játékos nyert Worlds-öt?",
                used: false,
                answer: {
                    text: 9,
                    type: "guessNumber",
                    confirm: false,
                    points: 20,
                },
            },
            {
                id: "bot3",
                question: "Kire utal a kép?",
                used: false,
                pictureSrc: "/quiz/ai/worlds/riddle2.webp",
                answer: {
                    text: "Vízicsacsi",
                    type: "handRaise",
                    confirm: false,
                    points: 30,
                    pictureSrc: ["/quiz/ai/worlds/riddle2.webp"],
                },
            },
        ],
    },
];
