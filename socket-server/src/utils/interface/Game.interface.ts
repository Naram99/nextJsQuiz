import { LobbyType } from "../type/LobbyType.type";
import { GameSettings } from "./GameSettings.interface";
import { GameState } from "./GameState.interface";

export interface Game<SettingsType = GameSettings, StateType = GameState> {
    id: string;
    joinCode: string;
    lobbyType: LobbyType;
    isActive: boolean;
    players: string[];
    settings: SettingsType;
    state: StateType;

    generateId(): void;
    startGame(): void;
    setScore(): void;
    checkGameEnd(): boolean;
}
