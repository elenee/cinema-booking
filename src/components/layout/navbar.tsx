"use client";

import { useState } from "react";
import { LoginModal } from "../auth/LoginModal";
import { RegisterModal } from "../auth/RegisterModal";

export function Navbar() {
    const [authModal, setAuthModal] = useState<"login" | "register" | null>(null,);

    return (
        <>
            <nav className="flex items-center justify-between p-4">
                <div className="flex gap-4">
                    <button type="button" onClick={() => setAuthModal('login')}>
                        Log In
                    </button>
                    <button type="button"
                        onClick={() => setAuthModal('register')}>
                        Sign Up
                    </button>
                </div>
            </nav>

            {authModal === "login" && (
                <LoginModal
                    onClose={() => setAuthModal(null)}
                    onSignUp={() => setAuthModal("register")}
                />
            )}

            {authModal === "register" && (
                <RegisterModal
                    onClose={() => setAuthModal(null)}
                    onLogin={() => setAuthModal("login")}
                />
            )}
        </>
    );
}