"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type User = {
    name: string;
    id: string;
} | null;

type UserContextType = {
    user: User;
    isLoading: boolean;
    setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    isLoading: true,
    setUser: () => {}
});

export const useUser = () => useContext(UserContext);

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    const fetchUser = async () => {
        try {
            const response = await fetch("/api/auth/token/me", {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            
            if (data.user?.name && data.user?.id) {
                setUser(data.user);
                setIsLoading(false);
                setRetryCount(0); // Reset retry count on success
            } else if (retryCount < MAX_RETRIES) {
                // If no user data and we haven't exceeded retries, try again
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                }, RETRY_DELAY);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            if (retryCount < MAX_RETRIES) {
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                }, RETRY_DELAY);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, [retryCount]); // Re-run when retryCount changes

    return (
        <UserContext.Provider value={{ user, isLoading, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
