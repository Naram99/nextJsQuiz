import { LanguageContext } from "@/context/LanguageContext";
import { useContext, useState } from "react";
import InputGroup from "../InputGroup";
import SelectedUser from "../SelectedUser";
import UserFindMulti from "../UserFindMulti";

export default function SearchMultiUserModalBody() {
    const { texts } = useContext(LanguageContext)!;
    const profileText = texts.profileTexts!;

    // TODO: create with name const [roomName, setRoomName] = useState<string | null>(null)
    const [searchParams, setSearchParams] = useState("");
    const [finds, setFinds] = useState<Record<string, string>[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<Record<string, string>[]>([]);

    async function searchUsers() {
        const resp = await fetch("/api/search/user", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ search: searchParams }),
        });

        if (resp.ok) {
            const response = await resp.json();
            setFinds(response.data);
        }
    }

    async function createRoom() {
        const idArr = selectedUsers.map(user => (user.id));
        const resp = await fetch("/api/chat", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(idArr)
        })

        if (resp.ok) {
            setFinds([]);
            setSelectedUsers([]);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchParams(e.target.value);
    }

    function handleAddUser(id: string, name: string) {
        setSelectedUsers([...selectedUsers, {id: id, name: name}]);
    }

    function handleRemoveUser(id: string) {
        setSelectedUsers(selectedUsers.filter(user => user.id !== id));
    }
    
    return (
        <div className={"modal-body"}>
            <div className={"modal-search-ct"}>
                <InputGroup
                    title={profileText.searchForUser}
                    id={"comment"}
                    inputType={"text"}
                    onChange={handleChange}
                    value={searchParams}
                />
                <button type={"button"} className={"modal-btn"} onClick={searchUsers}>
                    {profileText.search}
                </button>
            </div>
            <div className={"modal-selected-users"}>
                {selectedUsers.map(user => (
                    <div className={"selected-user"} key={user.id}>
                        <SelectedUser id={user.id} name={user.name} handleRemove={handleRemoveUser} />
                    </div>
                ))}
            </div>
            <div className={"modal-search-finds"}>
                {finds.map((user) => (
                    <div className={"user-find"} key={user.id}>
                        <UserFindMulti id={user.id} name={user.name} handleAdd={handleAddUser} />
                    </div>
                ))}
            </div>
            <button type={"button"} className={"modal-btn"} onClick={createRoom}>
                {profileText.submit}
            </button>
        </div>
    );
}