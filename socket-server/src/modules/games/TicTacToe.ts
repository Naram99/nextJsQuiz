import ServerContext from "../../utils/ServerContext";
import { TicTacToeGame } from "../../utils/interface/TicTacToeGame.interface";
import { TicTacToePlayer } from "../../utils/type/TicTacToePlayer.type";
import { UserInLobby } from "../../utils/type/UserInLobby.type";
import { TicTacToeSettings } from "../../utils/type/settings/TicTacToeSettings.type";

export default class TicTacToe implements TicTacToeGame {
    public settings: TicTacToeSettings = {
        minPlayers: 2,
        maxPlayers: 2,
        rounds: 1,
    };
    private board: (TicTacToePlayer | null)[] = Array(9).fill(null);
    private active: boolean = false;
    private activePlayer: TicTacToePlayer = "X";

    constructor(
        private sc: ServerContext,
        public readonly id: string,
        public readonly players: Record<TicTacToePlayer, UserInLobby>,
        public onGameEnd: (player: string, score: number) => void,
        rounds: number = 1
    ) {
        this.settings.rounds = rounds;
    }

    start(): void {
        this.active = true;
        this.socketListenerSetup();
        this.emitUserData();
        this.sc.io.to(this.id).emit("tictactoe:newGame");
    }

    private socketListenerSetup(): void {
        // TODO: setup
        Object.values(this.players).forEach(user => {
            user.socket?.removeAllListeners("tictactoe:moveSend");
            user.socket?.on("tictactoe:moveSend", (
                id: string, 
                index: number, 
                name: string | undefined
            ) => {
                if (this.players[this.activePlayer].name === name)
                    this.handleMove(index)
            })
        })
    }

    private emitUserData(): void {
        const startData: Map<string, {symbol: TicTacToePlayer, score: number}> = new Map();
        Object.entries(this.players).forEach(([symbol, user]) => {
            startData.set(user.name, {symbol: symbol as TicTacToePlayer, score: user.score})
        })
        // TODO: Map-ek átírása!
        console.log(startData);
        this.sc.io.to(this.id).emit("tictactoe:playerData", startData)
    }

    handleMove(index: number): void {
        console.log(index, this.activePlayer);
        
        if (!this.board[index] && this.active) {
            this.board[index] = this.activePlayer;
            const end = this.checkGameEnd();
            // Tie check review later
            if (end) {
                this.active = false;
                this.sc.io.to(this.id).emit("tictactoe:move", this.board, this.activePlayer);
                this.sc.io.to(this.id).emit("tictactoe:gameEnd", end)
                this.onGameEnd(this.players[this.activePlayer].userId, end === "tie" ? 0 : 1);
            } else {
                this.activePlayer = this.activePlayer === "X" ? "O" : "X";
                this.sc.io.to(this.id).emit("tictactoe:move", this.board, this.activePlayer);
            } 
        }
    }

    checkGameEnd(): TicTacToePlayer | "tie" | null {
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

        for (const [a, b, c] of winningCombinations) {
            if (
                this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            ) {
                return this.activePlayer;
            }
        }

        if (!this.board.includes(null)) return "tie";

        return null;
    }
}
