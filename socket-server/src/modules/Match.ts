import { MatchInterface } from "../utils/interface/Match.interface";
import { GameType } from "../utils/type/GameType.type";

export default class Match implements MatchInterface {
    constructor(public readonly id: string, public readonly gameType: GameType) {}

    start(): void {
        
    }
}