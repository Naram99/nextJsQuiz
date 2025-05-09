import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SelectedUser(
    {id, name, handleRemove}: 
    {id: string, name: string, handleRemove: (id: string) => void}) {
    return (
        <div className={"selected-card"}>
            <div className={"selected-name"}>{name}</div>
            <FontAwesomeIcon
                id={id}
                icon={faX}
                className={"user-find-icon"}
                onClick={() => handleRemove(id)}
            />
        </div>
    )
}