import { GameType } from "../type/GameType.type";

export interface MatchInterface {
    id: string;
    gameType: GameType

    start(): void;
}
