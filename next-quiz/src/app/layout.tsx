import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import React from "react";

export const metadata: Metadata = {
    title: "DRV Quiz App",
    description: "Official Quiz app from the DROVE team",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LanguageProvider>
            <html lang="en">
                <body className={"layout-ct"}>
                    {children}
                    <div id={"modal"}></div>
                </body>
            </html>
        </LanguageProvider>
    );
}

