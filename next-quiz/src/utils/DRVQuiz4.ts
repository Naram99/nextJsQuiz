import { CategoryData } from "./types/games/CategoryData.type";

export const DRVQuizData: CategoryData[] = [
    {
        id: "cat1",
        name: "CC",
        iconsPath: "/quiz/top",
        questions: [
            {
                id: "top1",
                question:
                    "Nevezz meg egy hőst, aki le tudja szedni magáról a CC-t miközben az hat rá!",
                used: false,
                answer: {
                    type: "multiSelect",
                    text: ["Alistar", "Olaf", "Gangplank", "Rengar"],
                    selectType: "champion",
                    amount: 1,
                    confirm: true,
                    pointsPerCorrect: true,
                    points: 10,
                },
            },
            {
                id: "top2",
                question:
                    "Melyik tanknak nincs hard CC-je egyik alap képességén sem?",
                used: false,
                answer: {
                    text: "Malphite",
                    type: "handRaise",
                    confirm: false,
                    points: 20,
                },
            },
            {
                id: "top3",
                question: "Nevezz meg egy hőst, akinek 5 különböző CC-je van!",
                used: false,
                answer: {
                    text: ["Nautilus", "Poppy", "RenataGlasc", "Urgot"],
                    type: "handRaise",
                    confirm: false,
                    points: 30,
                },
            },
            {
                id: "top4",
                question: "Melyik knockup tart a legtovább?",
                used: false,
                answer: {
                    text: "Kalista R (2 sec)",
                    type: "handRaise",
                    confirm: false,
                    points: 40,
                },
            },
            {
                id: "top5",
                question:
                    "Sorold fel azokat a hősöket, akiknek semmilyen CC-je nincs!",
                used: false,
                answer: {
                    text: [
                        "Akshan",
                        "Ezreal",
                        "KaiSa",
                        "Katarina",
                        "Lucian",
                        "MasterYi",
                        "Samira",
                        "Sivir",
                    ],
                    type: "multiSelect",
                    confirm: true,
                    pointsPerCorrect: true,
                    points: 10,
                    amount: 8,
                    selectType: "champion",
                },
            },
        ],
    },
    {
        id: "cat2",
        name: "Skins",
        iconsPath: "/quiz/jungle",
        questions: [
            {
                id: "jng1",
                question: "",
                used: false,
                answer: {
                    text: "",
                    type: "handRaise",
                    points: 10,
                    confirm: false,
                    pictureSrc: "",
                },
            },
            {
                id: "jng2",
                question: "Melyik Caitlyn skinek fegyverei lettek összegyúrva?",
                used: false,
                answer: {
                    text: ["Headhunter", "Pulsefire"],
                    type: "handRaise",
                    points: 20,
                    confirm: false,
                    pictureSrc: [],
                },
            },
        ],
    },
    {
        id: "cat3",
        name: "Riot Games",
        iconsPath: "/quiz/mid",
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
            {
                id: "mid4",
                question:
                    "Nevezz meg minél több hőst, aki a nevét egy Riot dolgozó 'Neve' után kapta!",
                used: false,
                answer: {
                    text: ["Ezreal", "Kassadin", "Ryze", "Tryndamere"],
                    type: "multiSelect",
                    confirm: true,
                    pointsPerCorrect: true,
                    points: 10,
                    amount: 4,
                    selectType: "champion",
                },
            },
            {
                id: "mid5",
                question: "Mikor alapították a Riot Games céget?",
                used: false,
                answer: {
                    text: 1157068800000,
                    type: "guessDate",
                    confirm: true,
                    points: 50,
                },
            },
        ],
    },
    {
        id: "cat4",
        name: "DROVE",
        iconsPath: "/quiz/bot",
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
                    type: "single",
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
        iconsPath: "/quiz/support",
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
