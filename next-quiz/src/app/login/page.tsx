"use client";

import React, {useContext, useState} from "react";
import logo from "../../../public/logoWhite.png";
import Image from "next/image";
import styles from "./page.module.css";
import {LanguageContext} from "@/context/LanguageContext";

const LoginPage: React.FC = () => {
    const {texts} = useContext(LanguageContext)!;
    const loginTexts = texts.loginTexts!;

    const [register, setRegister] = useState(false);

    const handleSwitch = (): void => {
        setRegister(!register);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <main className={styles.page}>
            <div className={styles.loginWrapper}>
                <div className={styles.guestFormCt}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="guest">{loginTexts.gameCode}</label>
                        <input type="text" name="guest" id="guest" />
                        <button type="submit">{loginTexts.join}</button>
                    </form>
                </div>
                <div className={styles.logoCt}>
                    <Image src={logo} alt="DRV logo" className={styles.logo} />
                </div>
                <div className={styles.loginFormCt}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">{loginTexts.userName}</label>
                        <input type="text" name="username" id="username" />
                        <label htmlFor="password">{loginTexts.password}</label>
                        <input type="password" name="papasswordrd" id="password" />
                        {register && (
                            <>
                                <label htmlFor="passwordCheck">{loginTexts.passwordAgain}</label>
                                <input type="password" name="passwordCheck" id="passwordCheck" />
                                <label htmlFor="email">{loginTexts.email}</label>
                                <input type="text" name="email" id="email" />
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
