"use client";

import { useState } from "react";
import { LoginModal } from "../auth/LoginModal";

export function Navbar() {
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <>
            <nav className="flex items-center justify-between p-4">
                <div className="flex gap-4">
                    <button type="button" onClick={() => setLoginOpen(true)}>
                        Log In
                    </button>
                    <button type="button">Sign Up</button>
                </div>
            </nav>

            {loginOpen && (
                <LoginModal
                    onClose={() => setLoginOpen(false)}
                    onSignUp={() => { }}
                />
            )}
        </>
    );
}