"use client";

import React, {useContext, useState} from "react";
import logo from "../../../public/logoWhite.png";
import Image from "next/image";
import styles from "./page.module.css";
import {LanguageContext} from "@/context/LanguageContext";
import InputGroup from "@/app/login/InputGroup";
import FormValuesInterface from "@/utils/FormValues.interface";

const LoginPage: React.FC = () => {
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

    const handleSwitch = (): void => {
        setRegister(!register);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let path: string = e.currentTarget.id.replace("Form", "");
        if (register && path === "login")
            path = "register";

        console.log(formValues);

        const resp = await fetch(`/api/auth/${path}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formValues)
        })

        // TODO: login response
        const data = await resp.json();
        console.log(data);
    };

    return (
        <main className={styles.page}>
            <div className={styles.loginWrapper}>
                <div className={styles.guestFormCt}>
                    <form id={"guestForm"} onSubmit={handleSubmit}>
                        <InputGroup title={loginTexts.gameCode} id={"guest"} inputType={"text"} onChange={handleChange} />
                        <button type="submit">{loginTexts.join}</button>
                    </form>
                </div>
                <div className={styles.logoCt}>
                    <Image src={logo} alt="DRV logo" className={styles.logo} />
                </div>
                <div className={styles.loginFormCt}>
                    <form id={"loginForm"} onSubmit={handleSubmit}>
                        <InputGroup title={loginTexts.userName} id={"username"} inputType={"text"} onChange={handleChange} />
                        <InputGroup title={loginTexts.password} id={"password"} inputType={"password"} onChange={handleChange} />
                        {register && (
                            <>
                                <InputGroup title={loginTexts.passwordAgain} id={"passwordCheck"} inputType={"password"} onChange={handleChange} />
                                <InputGroup title={loginTexts.email} id={"email"} inputType={"text"} onChange={handleChange} />
                            </>
                        )}
                        <button type="submit">{register ? loginTexts.register : loginTexts.login}</button>
                        <hr />
                        <button onClick={handleSwitch}>{register ? loginTexts.login : loginTexts.register}</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
