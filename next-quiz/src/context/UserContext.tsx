import { jwtVerify } from "jose";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type User = {
    name: string;
    id: string;
} | null;

const UserContext = createContext<User>(null);

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        fetch("/api/auth/token", {
            method: "GET",
            credentials: "include",
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.user.name && data.user.id) {
                    setUser(data.user);
                }
            })
            .catch(() => setUser(null));
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
