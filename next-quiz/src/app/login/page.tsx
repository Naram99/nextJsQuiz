"use client";

import { useState } from "react";
import logo from "../../../public/logoWhite.png";
import Image from "next/image";
import styles from "./page.module.css";

const LoginPage: React.FC = () => {
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
                        <label htmlFor="guest">Game code</label>
                        <input type="text" name="guest" id="guest" />
                        <button type="submit">Join game</button>
                    </form>
                </div>
                <div className={styles.logoCt}>
                    <Image src={logo} alt="DRV logo" className={styles.logo} />
                </div>
                <div className={styles.loginFormCt}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="papasswordrd" id="password" />
                        {register && (
                            <>
                                <label htmlFor="passwordCheck">Password again</label>
                                <input type="password" name="passwordCheck" id="passwordCheck" />
                                <label htmlFor="email">Email address</label>
                                <input type="text" name="email" id="email" />
                            </>
                        )}
                        <button type="submit">{register ? "Register" : "Login"}</button>
                        <hr />
                        <button onClick={handleSwitch}>{register ? "Login" : "Register"}</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
