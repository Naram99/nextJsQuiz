"use client";

import React, {useContext, useState} from "react";
import ProfileEditValuesInterface from "@/utils/interfaces/ProfileEditValues.interface";
import InputGroup from "@/components/InputGroup";
import {LanguageContext} from "@/context/LanguageContext";

export default function ProfileEditor(
    {username, email, phone, profilePic, id}:
    {username: string, email: string, phone: string, profilePic: string, id: string},
) {
    const {texts} = useContext(LanguageContext)!;
    const profileText = texts.profileTexts!;

    const [userData, setUserData] = useState<ProfileEditValuesInterface>({
        name: username,
        id: id,
        email: email,
        phone: phone,
        profilePicture: profilePic,
        oldPassword: "",
        newPassword: "",
        passwordCheck: "",
    })

    const userTexts: Record<keyof ProfileEditValuesInterface, string> = {
        name: profileText.name,
        id: "",
        email: profileText.email,
        phone: profileText.phone,
        profilePicture: profileText.profilePicture,
        oldPassword: profileText.oldPassword,
        newPassword: profileText.newPassword,
        passwordCheck: profileText.passwordCheck,
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
                            title={userTexts[key as keyof ProfileEditValuesInterface]}
                            id={key}
                            inputType={key.toLowerCase().includes("password") 
                                ? "password" 
                                : (key.toLowerCase().includes("picture") ? "file" : "text")}
                            onChange={handleChange}
                            value={value}/>
                    </div>
                ))}
            <button type="submit">{profileText.submit}</button>
        </form>
    )
}