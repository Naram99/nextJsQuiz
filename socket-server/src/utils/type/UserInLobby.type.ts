import { Socket } from "socket.io";

export type UserInLobby = {
    userId: string;
    name: string;
    socket?: Socket;
    isConnected: boolean;
    score: number;
};
