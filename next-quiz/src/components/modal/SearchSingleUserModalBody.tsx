"use client";

import { useContext, useState } from "react";
import InputGroup from "../InputGroup";
import { LanguageContext } from "@/context/LanguageContext";
import UserFind from "../UserFind";

export default function SearchSingleUserModalBody() {
    const { texts } = useContext(LanguageContext)!;
    const profileText = texts.profileTexts!;

    const [searchParams, setSearchParams] = useState("");
    const [finds, setFinds] = useState<Record<string, string>[]>([]);

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

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchParams(e.target.value);
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
            <div className={"modal-search-finds"}>
                {finds.map((user) => (
                    <div className={"user-find"} key={user.id}>
                        <UserFind id={user.id} name={user.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}
