import { io, Socket } from "socket.io-client";

const WS_URL = `http://${process.env.NEXT_PUBLIC_WS_HOST}:${process.env.NEXT_PUBLIC_WS_PORT}`;

export const socket: Socket = io(WS_URL, {
    autoConnect: false,
});

export async function connectSocketWithFreshToken() {
    const resp = await fetch("/api/auth/token", {
        method: "GET",
        credentials: "include",
    });

    if (resp.ok) {
        const data = await resp.json();
        const freshToken = data.token;

        socket.auth = { token: freshToken };
        socket.connect();
    } else {
        console.error("Token fetch failed. Cannot connect socket.");
    }
}

socket.on("connect", () => {
    console.log(`Socket connected with id: ${socket.id}`);
});

socket.on("connect_error", (error) => {
    console.log(`Socket connection error: ${error}`);
});

socket.on("reconnect_attempt", async () => {
    const resp = await fetch("/api/auth/token", {
        method: "GET",
        credentials: "include",
    });

    if (resp.ok) {
        const data = await resp.json();
        socket.auth = { token: data.token };
    }
});
