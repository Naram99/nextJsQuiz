"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function LobbyPage() {
    const params = useParams();
    const id = params.id;

    const [users, setUsers] = useState<string[]>([]);
}
