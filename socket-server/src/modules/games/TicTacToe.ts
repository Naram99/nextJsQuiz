import { TicTacToeGame } from "../../utils/interface/TicTacToeGame.interface";
import { LobbyType } from "../../utils/type/LobbyType.type";
import { TicTacToePlayer } from "../../utils/type/TicTacToePlayer.type";
import { TicTacToeSettings } from "../../utils/type/settings/TicTacToeSettings.type";

export default class TicTacToe implements TicTacToeGame {
    public settings: TicTacToeSettings = {
        minPlayers: 2,
        maxPlayers: 2,
        rounds: 1,
    };
    private board: (TicTacToePlayer | null)[] = Array(9).fill(null);
    private activePlayer: TicTacToePlayer = "X";

    constructor(
        public readonly id: string,
        public readonly players: Record<TicTacToePlayer, string>,
        rounds: number = 1
    ) {
        this.settings.rounds = rounds;
    }

    start(): void {
        this.socketListenerSetup();
        // TODO: start
    }

    private socketListenerSetup(): void {
        // TODO: setup
    }

    handleMove(index: number): void {
        if (!this.board[index]) {
            this.board[index] = this.activePlayer;
            this.activePlayer = this.activePlayer === "X" ? "O" : "X";
        }
    }

    checkGameEnd(): boolean {
        const winningCombinations = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        // TODO: checkGameEnd
        return true;
    }

    private declareWinner(): TicTacToePlayer | "tie" {
        // TODO: declareWinner
        return this.activePlayer;
    }
}
