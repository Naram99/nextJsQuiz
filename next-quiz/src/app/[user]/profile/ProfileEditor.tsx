"use client";

import React, {useState} from "react";
import ProfileEditValues from "@/utils/ProfileEditValues";
import InputGroup from "@/components/InputGroup";

export default function ProfileEditor(
    {username, email, phone, profilePic, id}:
    {username: string, email: string, phone: string, profilePic: string, id: string},
) {
    const [userData, setUserData] = useState<ProfileEditValues>({
        name: username,
        id: id,
        email: email,
        phone: phone,
        profilePicture: profilePic,
        oldPassword: "",
        newPassword: "",
        passwordCheck: "",
    })

    const userTexts: Record<keyof ProfileEditValues, string> = {
        name: "",
        id: "",
        email: "",
        phone: "",
        profilePicture: "",
        oldPassword: "",
        newPassword: "",
        passwordCheck: "",
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUserData(data => ({...data, [name]: value}));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // TODO: Update profile
        const response = await fetch("/api/profile", {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(userData),
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            {Object.entries(userData)
                .filter(([key]) => key !== "id")
                .map(([key, value]) => (
                    <div key={key}>
                        <InputGroup
                            title={userTexts[key as keyof ProfileEditValues]}
                            id={key}
                            inputType={key.toLowerCase().includes("password") 
                                ? "password" 
                                : (key.toLowerCase().includes("picture") ? "file" : "text")}
                            onChange={handleChange}
                            value={value}/>
                    </div>
                ))}
            <button type="submit">Submit</button>
        </form>
    )
}