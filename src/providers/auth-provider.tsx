"use client";

import { getCurrentUser } from "@/lib/api/auth";
import { User } from "@/lib/api/types";
import { getToken, removeToken, setToken } from "@/lib/auth/token";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
    user: User | null
    loading: boolean;
    setAuth: (token: string, user: User) => void
    clearAuth: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function restoreSession() {
            const token = getToken()

            if (!token) {
                setLoading(false)
                return
            }

            try {
                const currentUser = await getCurrentUser()
                setUser(currentUser)
            } catch {
                removeToken()
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        restoreSession()
    }, [])


    function setAuth(token: string, user: User) {
        setToken(token);
        setUser(user);
    }

    function clearAuth() {
        removeToken();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, setAuth, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}