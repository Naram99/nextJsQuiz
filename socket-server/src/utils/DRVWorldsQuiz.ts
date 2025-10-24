import { CategoryData } from "./type/quiz/CategoryData.type";

export const DRVQuizData: CategoryData[] = [
    {
        id: "cat1",
        name: "Worlds finals",
        iconsPath: "/quiz/top/",
        questions: [
            {
                id: "top1",
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
                question: "Melyik hős van a képen?",
                used: false,
                pictureSrc: "/quiz/ai/worlds/1.png",
                answer: {
                    text: "Corki",
                    type: "handRaise",
                    points: 10,
                    confirm: false,
                    pictureSrc: ["/quiz/ai/worlds/1.png"],
                },
            },
            {
                id: "jng2",
                question: "Melyik skin lett átalakítva?",
                used: false,
                pictureSrc: "/quiz/ai/worlds/2.png",
                answer: {
                    text: "Jailbreak Graves",
                    type: "handRaise",
                    points: 20,
                    confirm: false,
                    pictureSrc: ["/quiz/ai/worlds/2.png"],
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
                question:
                    "Nevezz meg egy kizárólag mobilos Riot Games játékot!",
                used: false,
                answer: {
                    text: "Wild Rift, Golden Spatula",
                    type: "handRaise",
                    confirm: false,
                    points: 10,
                },
            },
            {
                id: "mid2",
                question: "Hány irodája van a Riot Games-nek világszerte?",
                used: false,
                answer: {
                    text: 23,
                    type: "guessNumber",
                    confirm: false,
                    points: 20,
                },
            },
            {
                id: "mid3",
                question:
                    "Melyik tárgyat nevezték el a Riot Games első dolgozója után?",
                used: false,
                answer: {
                    text: "Guinsoo's Rageblade",
                    type: "handRaise",
                    confirm: false,
                    points: 30,
                },
            },
        ],
    },
    {
        id: "cat4",
        name: "DROVE",
        iconsPath: "/quiz/bot/",
        questions: [
            {
                id: "bot1",
                question: "Mikor volt az első LoLos buli?",
                used: false,
                answer: {
                    text: 2018,
                    type: "handRaise",
                    confirm: false,
                    points: 10,
                },
            },
            {
                id: "bot2",
                question:
                    "Hány különböző ruhadarabból áll a full DROVE merch szett?",
                used: false,
                answer: {
                    text: 4,
                    type: "guessNumber",
                    confirm: false,
                    points: 20,
                },
            },
            {
                id: "bot3",
                question: "Milyen típusú Clash-t nyert már a DROVE?",
                used: false,
                answer: {
                    text: ["MSI", "Demacia", "Bandle City"],
                    type: "multiSelect",
                    confirm: true,
                    pointsPerCorrect: true,
                    points: 10,
                    selectType: "event",
                    amount: 3,
                },
            },
            {
                id: "bot4",
                question:
                    "Nevezz meg 4-et a Sebinél felírt idézői nevek közül!",
                used: false,
                answer: {
                    text: [],
                    type: "handRaise",
                    confirm: false,
                    points: 40,
                },
            },
            {
                id: "bot5",
                question:
                    "Mi volt a legelső esport bajnokságon a DROVE teamcompja amin elindultunk?",
                used: false,
                answer: {
                    text: [
                        "Gangplank",
                        "Sejuani",
                        "Vladimir",
                        "Ashe",
                        "Thresh",
                    ],
                    type: "multiSelect",
                    selectType: "champion",
                    amount: 5,
                    pointsPerCorrect: true,
                    points: 10,
                    confirm: true,
                },
            },
        ],
    },
    {
        id: "cat5",
        name: "Random",
        iconsPath: "/quiz/support/",
        questions: [
            {
                id: "sup1",
                question: "Hány hős rendelkezik 20+ skinnel?",
                used: false,
                answer: {
                    text: 4,
                    type: "guessNumber",
                    confirm: false,
                    points: 10,
                },
            },
            {
                id: "sup2",
                question:
                    "Összesen hányan Co-Stream-elték a 2024-es Worlds-öt?",
                used: false,
                answer: {
                    text: 90,
                    type: "guessNumber",
                    confirm: false,
                    points: 20,
                },
            },
            {
                id: "sup3",
                question:
                    "Mikor mondja Draven a következő szöveget: 'Nice axe, I'll take it!'",
                used: false,
                answer: {
                    text: "Amikor elkapja egy másik Draven baltáját.",
                    type: "handRaise",
                    confirm: false,
                    points: 30,
                },
            },
            {
                id: "sup4",
                question:
                    "Melyik az egyetlen hős, aki rework-öt kapott, később mégis teljesen visszaállították az eredeti verzióját?",
                used: false,
                answer: {
                    text: "LeBlanc",
                    type: "handRaise",
                    confirm: false,
                    points: 40,
                },
            },
            {
                id: "sup5",
                question:
                    "Nevezz meg minél több hőst, akinek csak egyetlen sebző képessége van!",
                used: false,
                answer: {
                    text: [
                        "Tryndamere",
                        "Zilean",
                        "Taric",
                        "Shen",
                        "MasterYi",
                        "Bard",
                    ],
                    type: "multiSelect",
                    selectType: "champion",
                    confirm: true,
                    pointsPerCorrect: true,
                    points: 10,
                    amount: 6,
                },
            },
        ],
    },
];
