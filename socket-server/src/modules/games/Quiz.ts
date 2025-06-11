import QuizGame from "../../utils/interface/QuizGame.interface";
import { QuizSettings } from "../../utils/type/settings/QuizSettings.type";

export default class Quiz implements QuizGame {
    public readonly settings: QuizSettings = {
        minPlayers: 2,
        maxPlayers: 10,
    };

    constructor(public readonly id: string) {}
    
    public async initialize(): Promise<void> {}
    start(): void {}
}
