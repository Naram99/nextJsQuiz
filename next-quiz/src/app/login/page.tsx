"use client";

import React, {useContext, useEffect, useState} from "react";
import Image from "next/image";
import styles from "./page.module.css";
import {LanguageContext} from "@/context/LanguageContext";
import InputGroup from "@/components/InputGroup";
import FormValuesInterface from "@/utils/interfaces/FormValues.interface";
import {useRouter} from "next/navigation";
import {socket} from "@/socket/socket";

const LoginPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            try {
                const resp = await fetch('/api/auth/check', {
                    method: "GET",
                    credentials: "include",
                });
                if (resp.ok) {
                    const data = await resp.json();
                    if (data.username)
                        socket.connect();
                        router.push(`/${data.username}/dashboard`);
                }
            } catch (error) {
                console.error(error);
            }
        }

        checkAuth().then()
    }, [router]);

    const {texts} = useContext(LanguageContext)!;
    const loginTexts = texts.loginTexts!;

    const [register, setRegister] = useState(false);
    const [formValues, setFormValues] = useState<FormValuesInterface>({
        userName: "",
        email: "",
        password: "",
        passwordCheck: "",
        gameId: ""
    })

    function handleSwitch(): void {
        setRegister(!register);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let path: string = e.currentTarget.id.replace("Form", "");
        if (register && path === "login")
            path = "register";

        const resp = await fetch(`/api/auth/${path}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formValues)
        })

        // TODO: login response
        const data = await resp.json();
        console.log(data);
        if (path === "login" && resp.status === 200)
            router.push(`${data.user}/dashboard`);
    }

    return (
        <main className={styles.page}>
            <div className={styles.loginWrapper}>
                <div className={styles.guestFormCt}>
                    <form id={"guestForm"} onSubmit={handleSubmit}>
                        <InputGroup
                            title={loginTexts.gameCode}
                            id={"gameId"}
                            inputType={"text"}
                            value={formValues.gameId}
                            onChange={handleChange}
                        />
                        <button type="submit" className={styles.loginBtn}>{loginTexts.join}</button>
                    </form>
                </div>
                <div className={styles.logoCt}>
                    <Image 
                        src={"/logoWhite.png"} 
                        alt="DRV logo" 
                        className={styles.logo}
                        width={300}
                        height={300}
                    />
                </div>
                <div className={styles.loginFormCt}>
                    <form id={"loginForm"} onSubmit={handleSubmit}>
                        <InputGroup
                            title={loginTexts.userName}
                            id={"userName"}
                            inputType={"text"}
                            value={formValues.userName}
                            onChange={handleChange}
                        />
                        <InputGroup
                            title={loginTexts.password}
                            id={"password"}
                            inputType={"password"}
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        {register && (
                            <>
                                <InputGroup
                                    title={loginTexts.passwordAgain}
                                    id={"passwordCheck"}
                                    inputType={"password"}
                                    value={formValues.passwordCheck}
                                    onChange={handleChange}
                                />
                                <InputGroup
                                    title={loginTexts.email}
                                    id={"email"}
                                    inputType={"text"}
                                    value={formValues.email}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <button
                            type="submit"
                            className={styles.loginBtn}
                        >{register ? loginTexts.register : loginTexts.login}</button>
                        <hr />
                        <button
                            type="button"
                            onClick={handleSwitch}
                            className={styles.loginBtn}
                        >{register ? loginTexts.login : loginTexts.register}</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
