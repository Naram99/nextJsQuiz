"use client";

import { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import { LanguageContext } from "@/context/LanguageContext";
import InputGroup from "@/components/InputGroup";
import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

export default function LobbySetupPage() {
    const router = useRouter();

    const { texts } = useContext(LanguageContext)!;
    const lobbyText = texts.lobbyTexts!;

    const [code, setCode] = useState("");
    const [validCode, setValidCode] = useState(false);

    useEffect(() => {
        if (!socket.connected) connectSocketWithFreshToken();

        socket.on("validateJoinCodeAnswer", handleValidAnswer);
        socket.on("joinLobbyOk", joinProcedure);

        return () => {
            socket.off("validateJoinCodeAnswer", handleValidAnswer);
            socket.off("joinLobbyOk", joinProcedure);
        };
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCode(e.target.value);
        if (e.target.value.trim() !== "") {
            socket.emit("validateJoinCode", e.target.value);
        }
    }

    function handleValidAnswer(valid: boolean) {
        setValidCode(valid);
    }

    function handleCreate() {
        socket.emit("createLobby");
    }

    function handleJoin(e: React.FormEvent<HTMLFormElement> | React.MouseEvent) {
        e.preventDefault();
        if (validCode) {
            socket.emit("joinLobby", code);
        }
    }

    function joinProcedure(ok: boolean, link: string) {
        console.log(ok, link);

        if (ok) router.push(`/lobby/${link}`);
    }

    return (
        <div className={styles.lobbySetupWrapper}>
            <div className={styles.lobbyCreate}>
                <button type={"button"} className={styles.lobbyCreateBtn} onClick={handleCreate}>
                    {lobbyText.create}
                </button>
            </div>
            <form className={styles.lobbyJoin} onSubmit={handleJoin}>
                <InputGroup
                    id={"lobbyJoinInput"}
                    inputType={"text"}
                    onChange={handleChange}
                    value={code}
                    title={lobbyText.code}
                />
                <div className={styles.lobbyCodeValidator}>
                    {validCode ? (
                        <>
                            <FontAwesomeIcon icon={faCheck} />
                            {lobbyText.validCode}
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faX} />
                            {lobbyText.invalidCode}
                        </>
                    )}
                </div>
                <button type={"submit"} className={styles.lobbyJoinBtn} onClick={handleJoin}>
                    {lobbyText.join}
                </button>
            </form>
        </div>
    );
}
