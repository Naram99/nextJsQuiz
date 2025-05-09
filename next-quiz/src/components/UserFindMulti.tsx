import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserFindMulti(
    { id, name, handleAdd }: 
    { id: string; name: string, handleAdd: (id: string, name: string) => void }) {

    return (
        <div className={"user-find-card"}>
            <div className={"user-find-name"}>{name}</div>
                <FontAwesomeIcon
                    id={id}
                    icon={faUserPlus}
                    className={"user-find-icon"}
                    onClick={() => handleAdd(id, name)}
                />
        </div>
    );
}
