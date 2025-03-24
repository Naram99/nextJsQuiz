import React, {useState} from "react";
import ProfileEditValues from "@/utils/ProfileEditValues";

export default function ProfileEditor(
    {username, email, phone, profilePic, id}:
    {username: string, email: string, phone: string, profilePic: string, id: string},
) {
    const [userData, setUserData] = useState<ProfileEditValues>({
        id: id,
        name: username,
        email: email,
        phone: phone,
        profilePicture: profilePic,
        oldPassword: "",
        newPassword: "",
        passwordCheck: "",
    })
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const [name, value] = e.target.value;
        setUserData({...userData, [name]: value});
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}></form>
    )
}