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
        public onGameEnd: (data: { player: string; score: number }[]) => void,
        rounds: number = 1
    ) {
        this.settings.rounds = rounds;
    }

    initialize(): void {}

    start(): void {
        this.active = true;
        this.board = Array(9).fill(null);
        this.activePlayer = this.activePlayer === "X" ? "O" : "X";
        this.socketListenerSetup();
        this.sc.io
            .to(this.id)
            .emit("tictactoe:newGame", this.board, this.activePlayer);
        Object.entries(this.players).forEach(([symbol, user]) => {
            this.players[symbol as TicTacToePlayer].isReady = false;
        });
    }

    private socketListenerSetup(): void {
        Object.values(this.players).forEach((user) => {
            user.socket?.removeAllListeners("tictactoe:requestData");
            user.socket?.removeAllListeners("tictactoe:readySend");
            user.socket?.removeAllListeners("tictactoe:moveSend");

            user.socket?.on("tictactoe:requestData", (id: string) => {
                this.emitUserData();
            });
            user.socket?.on("tictactoe:readySend", (name: string) => {
                Object.entries(this.players).forEach(([symbol, user]) => {
                    if (user.name === name) {
                        this.players[symbol as TicTacToePlayer].isReady = true;
                    }
                });
                this.sc.io.to(this.id).emit("tictactoe:ready", name);
            });
            user.socket?.on(
                "tictactoe:moveSend",
                (id: string, index: number, name: string | undefined) => {
                    if (
                        !Object.values(this.players).some(
                            (user) => user.isReady === false
                        )
                    ) {
                        if (this.players[this.activePlayer].name === name)
                            this.handleMove(index);
                    }
                }
            );
        });
    }

    private emitUserData(): void {
        console.log(this.players);

        const startData: Map<
            string,
            { symbol: TicTacToePlayer; score: number; ready: boolean }
        > = new Map();
        Object.entries(this.players).forEach(([symbol, user]) => {
            startData.set(user.name, {
                symbol: symbol as TicTacToePlayer,
                score: user.score,
                ready: user.isReady,
            });
        });

        this.sc.emitMap(
            this.id,
            "tictactoe:playerData",
            startData,
            this.activePlayer
        );
    }

    handleMove(index: number): void {
        if (!this.board[index] && this.active) {
            this.board[index] = this.activePlayer;
            const end = this.checkGameEnd();
            // Tie check review later
            if (end) {
                this.active = false;
                this.sc.io
                    .to(this.id)
                    .emit("tictactoe:move", this.board, this.activePlayer);
                this.sc.io.to(this.id).emit("tictactoe:gameEnd", end);
                this.onGameEnd([
                    {
                        player: this.players[this.activePlayer].userId,
                        score: end === "tie" ? 0 : 1,
                    },
                ]);
                this.setScore(this.activePlayer, end === "tie" ? 0 : 1);
            } else {
                this.activePlayer = this.activePlayer === "X" ? "O" : "X";
                this.sc.io
                    .to(this.id)
                    .emit("tictactoe:move", this.board, this.activePlayer);
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

    private setScore(player: TicTacToePlayer, score: number): void {
        this.players[player].score = score;
    }

    public reconnectSocket(): void {
        this.socketListenerSetup();
        this.emitUserData();
        this.sc.io.to(this.id).emit("tictactoe:move", this.board, this.activePlayer);
    }
}
