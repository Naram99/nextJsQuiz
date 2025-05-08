"use client";

import { useContext, useState } from "react";
import InputGroup from "../InputGroup";
import { LanguageContext } from "@/context/LanguageContext";

export default function SearchSingleUserModalBody() {
    const {texts} = useContext(LanguageContext)!;
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
        setSearchParams(e.target.value)
    }

    return (<div className={"modalBodyWrapper"}>
        <InputGroup
            title={profileText.searchForUser}
            id={"comment"}
            inputType={"text"}
            onChange={handleChange}
            value={searchParams}
        />
        <button
            type={"button"}
            className={"modalBtn"}
            onClick={searchUsers}
        >
            {profileText.search}
        </button>
    </div>);
}
