import { faUserCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Loading from "./Loading";

export default function UserFind({ id, name }: { id: string; name: string }) {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    async function handleRequest(e: React.MouseEvent) {
        setLoading(true);
        const resp = await fetch("/api/friends", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ id: e.currentTarget.id }),
        });

        setLoading(false);

        if (resp.ok) {
            console.log("Request sent");
            setSent(true);
        }
    }

    return (
        <div className={"user-find-card"}>
            <div className={"user-find-name"}>{name}</div>
            {loading ? (
                <Loading />
            ) : sent ? (
                <FontAwesomeIcon icon={faUserCheck} />
            ) : (
                <FontAwesomeIcon
                    id={id}
                    icon={faUserPlus}
                    className={"user-find-icon"}
                    onClick={handleRequest}
                />
            )}
        </div>
    );
}
