"use client";

import { useEffect, useState } from "react";

export default function SearchSingleUserModalBody() {
    // TODO
    const [searchParams, setSearchParams] = useState("");
    const [finds, setFinds] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        async function searchUsers() {
            const resp = await fetch("/api/profile", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ search: searchParams }),
            });
        }
    }, [searchParams]);

    return <></>;
}
