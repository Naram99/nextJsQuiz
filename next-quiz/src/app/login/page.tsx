"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { LanguageContext } from "@/context/LanguageContext";
import InputGroup from "@/components/InputGroup";
import FormValuesInterface from "@/utils/interfaces/FormValues.interface";
import { useRouter } from "next/navigation";
import { socket } from "@/socket/socket";
import { useUser } from "@/context/UserContext";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const { setUser } = useUser();
    const { texts } = useContext(LanguageContext)!;
    const loginTexts = texts.loginTexts!;

    const [register, setRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formValues, setFormValues] = useState<FormValuesInterface>({
        userName: "",
        email: "",
        password: "",
        passwordCheck: "",
        gameId: "",
    });

    useEffect(() => {
        async function checkAuth() {
            try {
                const resp = await fetch("/api/auth/check", {
                    method: "GET",
                    credentials: "include",
                });
                if (resp.ok) {
                    const data = await resp.json();
                    if (data.username) socket.connect();
                    router.push(`/${data.username}/dashboard`);
                }
            } catch (error) {
                console.error(error);
            }
        }

        checkAuth();
    }, [router]);

    function handleSwitch(): void {
        setRegister(!register);
        setError(null);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setError(null);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let path: string = e.currentTarget.id.replace("Form", "");
            if (register && path === "login") path = "register";

            const resp = await fetch(`/api/auth/${path}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues),
                credentials: "include",
            });

            const data = await resp.json();
            
            if (!resp.ok) {
                throw new Error(data.message || "Authentication failed");
            }

            if (path === "login") {
                // Wait a short moment to ensure cookie is set
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Verify the cookie is set by making a test request
                const verifyResp = await fetch("/api/auth/token/me", {
                    method: "GET",
                    credentials: "include",
                });
                
                if (verifyResp.ok) {
                    const verifyData = await verifyResp.json();
                    if (verifyData.user?.name) {
                        setUser(verifyData.user);
                        router.push(`${data.user}/dashboard`);
                    } else {
                        throw new Error("Failed to verify authentication");
                    }
                } else {
                    throw new Error("Failed to verify authentication");
                }
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
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
                        <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                            {loginTexts.join}
                        </button>
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
                    {error && <div className={styles.error}>{error}</div>}
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
                        <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                            {register ? loginTexts.register : loginTexts.login}
                        </button>
                        <hr />
                        <button type="button" onClick={handleSwitch} className={styles.loginBtn} disabled={isLoading}>
                            {register ? loginTexts.login : loginTexts.register}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
