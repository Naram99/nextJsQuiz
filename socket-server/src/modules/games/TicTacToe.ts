import { GameSettings } from "../../utils/interface/GameSettings.interface";
import { TicTacToeGame } from "../../utils/interface/TicTacToeGame.interface";
import { TicTacToeGameState } from "../../utils/interface/TicTacToeGameState.interface";
import { LobbyType } from "../../utils/type/LobbyType.type";

export default class TicTacToe implements TicTacToeGame {
    private _id: string = "TI000000";
    private joinCode: string;
    private lobbyType: LobbyType;
    private isActive: boolean = false;
    private players: string[];
    private settings: GameSettings = {
        requiredPlayers: 2,
        maxPlayers: 2,
        maxNumberOfGames: 1,
        timeLimitPerMove: 15,
    };
    private state: TicTacToeGameState = {
        board: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ],
        activePlayer: "X",
        turn: 0,
        score: [],
    };

    constructor() {
        this.generateId();
    }

    private generateId() {
        this._id = `TI${Math.floor(Math.random() * 1000000)}`;
    }

    public startGame(): void {
        this.isActive = true;
    }

    handleMove(x: number, y: number): void {
        if (this.isActive && this.validateMove(x, y))
            this.state.board[x][y] = this.state.activePlayer;
    }

    private validateMove(x: number, y: number): boolean {
        return this.state.board[x][y] === "";
    }

    public get id(): string {
        return this._id;
    }
}
