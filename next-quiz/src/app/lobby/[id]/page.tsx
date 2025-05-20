"use client";

import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import { LobbySettings } from "@/utils/interfaces/LobbySettings.interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LobbyPage() {
    const params = useParams();
    const id = params.id;

    const [users, setUsers] = useState<string[]>([]);
    const [settings, setSettings] = useState<LobbySettings>({
        lobbyType: "open",
        minUsers: 2,
        maxUsers: 2,
        game: "tictactoe"
    })

    useEffect(() => {
        if (!socket.connected) {
            connectSocketWithFreshToken();
        }

        socket.emit("getLobbyData", id);

        socket.on("lobbyData", (users: string[], settings: LobbySettings) => {
            setUsers(users);
            setSettings(settings);
        })
    });

    // TODO: lobby page
}
