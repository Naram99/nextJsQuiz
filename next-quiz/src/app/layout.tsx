import type { Metadata } from "next";
import "./globals.css";

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
        <html lang="en">
            <body className={"layout-ct"}>{children}</body>
        </html>
    );
}

