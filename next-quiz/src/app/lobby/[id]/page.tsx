"use client";

import { useUser } from "@/context/UserContext";
import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import { LobbySettings } from "@/utils/interfaces/LobbySettings.interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import LobbyPageHeader from "./LobbyPageHeader";

export default function LobbyPage() {
    const me = useUser();

    const params = useParams();
    const id = params.id as string;

    const [users, setUsers] = useState<string[]>([]);
    const [settings, setSettings] = useState<LobbySettings>({
        lobbyType: "open",
        minUsers: 2,
        maxUsers: 2,
        game: "tictactoe",
    });

    useEffect(() => {
        if (!socket.connected) {
            connectSocketWithFreshToken();
        }

        socket.emit("getLobbyData", id);

        socket.on("lobbyData", handleData);

        return () => {
            socket.off("lobbyData", handleData);
            socket.emit("leaveLobby", id);
        };
    });

    function handleData(users: string[], settings: LobbySettings, owner: string) {
        setUsers(users);
        setSettings(settings);
    }

    // TODO: lobby page
    return (
        <div className={styles.lobbyPageWrapper}>
            <LobbyPageHeader me={me?.name} code={id} settings={settings} />
            <div className={styles.lobbyPageUsers}>{}</div>
        </div>
    );
}
