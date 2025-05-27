"use client";

import { useUser } from "@/context/UserContext";
import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import { LobbySettings } from "@/utils/interfaces/LobbySettings.interface";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import LobbyPageHeader from "./LobbyPageHeader";
import LobbyUser from "./LobbyUser";
import { lobbyType } from "@/utils/types/lobbyType.type";
import { gameCardType } from "@/utils/types/gameCardType.type";
import LobbyPageFooter from "./LobbyPageFooter";

export default function LobbyPage() {
    const router = useRouter();
    const me = useUser();

    const params = useParams();
    const id = params.id as string;

    const [users, setUsers] = useState<string[]>([]);
    const [owner, setOwner] = useState("");
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

        function handleData(users: string[], settings: LobbySettings, owner: string) {
            console.log(users, settings, owner);
            
            setUsers(users);
            setSettings(settings);
            setOwner(owner);
        }
        
        function handleValidAnswer(valid: boolean) {
            if (!valid) router.back();
            if (valid) socket.emit("checkIfUserInLobby", id);
        }
        
        function handleUserInLobby(bool: boolean) {
            if (!bool) socket.emit("joinLobby", id);
        }
        
        function handleJoinLobby(bool: boolean) {
            if (!bool) router.back();
        }

        socket.emit("validateJoinCode", id);
        socket.emit("getLobbyData", id);

        socket.on("validateJoinCodeAnswer", handleValidAnswer);
        socket.on("userInLobby", handleUserInLobby);
        socket.on("joinLobbyOk", handleJoinLobby);
        socket.on("lobbyData", handleData);
        
        return () => {
            socket.off("validateJoinCodeAnswer", handleValidAnswer);
            socket.off("userInLobby", handleUserInLobby);
            socket.off("joinLobbyOk", handleJoinLobby);
            socket.off("lobbyData", handleData);
            // TODO: handle lobby leave (switched off because of strict mode double run)
            // socket.emit("leaveLobby", id);
        };
    }, [id]);


    function handleLeaveLobby() {
        socket.emit("leaveLobby", id);
        router.back();
    }

    function handleStartMatch() {
        socket.emit("startMatch", id, me?.name);
    }

    // TODO: Átírni, hogy fordítások esetén is működjenek a változtatások
    function handleLobbyTypeChange(e: React.MouseEvent) {
        setSettings({ ...settings, lobbyType: e.currentTarget.textContent as lobbyType });
    }

    function handleGameTypeChange(e: React.MouseEvent) {
        setSettings({ ...settings, game: e.currentTarget.textContent as gameCardType });
    }

    return (
        <div className={styles.lobbyPageWrapper}>
            <LobbyPageHeader
                owner={owner === me?.name}
                code={id}
                settings={settings}
                setLobbyType={handleLobbyTypeChange}
                setGameType={handleGameTypeChange}
            />
            <div className={styles.lobbyPageUsers}>
                {users.map((user) => (
                    <div key={user}>
                        <LobbyUser name={user} owner={owner === me?.name} />
                    </div>
                ))}
            </div>
            <LobbyPageFooter
                min={settings.minUsers}
                max={settings.maxUsers}
                curr={users.length}
                leave={handleLeaveLobby}
                start={handleStartMatch}
            />
        </div>
    );
}
