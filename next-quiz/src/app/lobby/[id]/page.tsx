"use client";

import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LobbyPage() {
    const params = useParams();
    const id = params.id;

    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        if (!socket.connected) {
            connectSocketWithFreshToken();
        }

        socket.emit("getLobbyData", id);

        // TODO: socket.on("lobbyData")
    });

    // TODO: lobby page
}
