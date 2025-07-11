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
import RoundCounter from "./RoundCounter";
import QuizSelector from "./QuizSelector";

export default function LobbyPage() {
    const router = useRouter();
    const { user: me, isLoading } = useUser();

    const params = useParams();
    const id = params.id as string;

    const [users, setUsers] = useState<string[]>([]);
    const [owner, setOwner] = useState("");
    const [settings, setSettings] = useState<LobbySettings>({
        lobbyType: "open",
        minUsers: 2,
        maxUsers: 9,
        game: "tictactoe",
    });

    useEffect(() => {
        if (isLoading) return;

        if (!socket.connected) {
            connectSocketWithFreshToken();
        }

        function handleData(
            users: string[],
            settings: LobbySettings,
            owner: string
        ) {
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

        function handleMatchPrepare(gameType: gameCardType, code: string) {
            router.push(`/game/${gameType}/${code}`);
        }

        socket.emit("validateJoinCode", id);
        socket.emit("getLobbyData", id);

        socket.on("validateJoinCodeAnswer", handleValidAnswer);
        socket.on("userInLobby", handleUserInLobby);
        socket.on("joinLobbyOk", handleJoinLobby);
        socket.on("lobbyData", handleData);
        socket.on("matchPrepare", handleMatchPrepare);

        return () => {
            socket.off("validateJoinCodeAnswer", handleValidAnswer);
            socket.off("userInLobby", handleUserInLobby);
            socket.off("joinLobbyOk", handleJoinLobby);
            socket.off("lobbyData", handleData);
            socket.off("matchPrepare", handleMatchPrepare);
            // TODO: handle lobby leave (switched off because of strict mode double run)
            // socket.emit("leaveLobby", id);
        };
    }, [id, isLoading]);

    function handleLeaveLobby() {
        socket.emit("leaveLobby", id);
        router.back();
    }

    function handleStartMatch() {
        socket.emit("startMatch", id, me?.name);
    }

    // TODO: Átírni, hogy fordítások esetén is működjenek a változtatások
    function handleLobbyTypeChange(e: React.MouseEvent) {
        setSettings({
            ...settings,
            lobbyType: e.currentTarget.textContent as lobbyType,
        });
        socket.emit(
            "lobbyTypeChange",
            id,
            me?.name,
            e.currentTarget.textContent as lobbyType
        );
    }

    function handleGameTypeChange(e: React.MouseEvent) {
        setSettings({
            ...settings,
            game: e.currentTarget.textContent as gameCardType,
        });
        socket.emit(
            "gameTypeChange",
            id,
            me?.name,
            e.currentTarget.textContent as gameCardType
        );
    }

    return (
        <div className={styles.lobbyPageWrapper}>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
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
                                <LobbyUser name={user} owner={owner} />
                            </div>
                        ))}
                    </div>
                    {settings.game === "quiz" ? (
                        owner === me?.name ? (
                            <QuizSelector id={me?.id} />
                        ) : (
                            ""
                        )
                    ) : (
                        <RoundCounter id={id} name={me?.name} />
                    )}
                    <LobbyPageFooter
                        min={settings.minUsers}
                        max={settings.maxUsers}
                        curr={users.length}
                        leave={handleLeaveLobby}
                        start={handleStartMatch}
                    />
                </>
            )}
        </div>
    );
}
