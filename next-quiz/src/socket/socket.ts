import { io } from "socket.io-client";

async function getToken(): Promise<string | null> {
    let token: string | null = null;

    const resp = await fetch("/api/auth/token", {
        method: "GET",
        credentials: "include",
    });

    if (resp.ok) {
        const data = await resp.json();
        token = data.token;
    }

    return token;
}

const token = await getToken();

console.log(token);

export const socket = io(
    `http://${process.env.NEXT_PUBLIC_WS_HOST}:${process.env.NEXT_PUBLIC_WS_PORT}`,
    {
        autoConnect: false,
        auth: {
            token: token,
        },
    }
);

socket.on("connect", () => {
    console.log(`Socket connected with id: ${socket.id}`);
});

socket.on("connect_error", (error) => {
    console.log(`Socket connection error: ${error}`);
});
