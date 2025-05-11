import { GameSettings } from "./GameSettings.interface";

export interface QuizTacToeGameSettings extends GameSettings {
    categories: Record<string, string>[];
}
