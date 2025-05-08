import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserFind({ id, name }: { id: string; name: string }) {
    async function handleRequest(e: React.MouseEvent) {
        const resp = await fetch("/api/friends", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ id: e.currentTarget.id }),
        });

        if (resp.ok) {
            console.log("Request sent");
        }
    }

    return (
        <div className={"user-find-card"}>
            <div className={"user-find-name"}>{name}</div>
            <FontAwesomeIcon
                id={id}
                icon={faUserPlus}
                className={"user-find-icon"}
                onClick={handleRequest}
            />
        </div>
    );
}
