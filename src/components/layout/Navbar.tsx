"use client";

import { useState } from "react";
import Link from "next/link";
import { LoginModal } from "../auth/LoginModal";
import { RegisterModal } from "../auth/RegisterModal";
import { NavbarSearch } from "./NavbarSearch";

export function Navbar() {
    const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);

    return (
        <>
            <nav className="sticky top-0 z-10  flex items-center justify-between bg-linear-to-b from-black from-0% via-black/51 via-80% to-black/0 to-100% px-15 py-6">
                <div className="flex items-center gap-9 text-white">
                    <Link href="/" className="text-[20px] font-extrabold uppercase">
                        kino <span className="text-primary">xii</span>
                    </Link>

                    <Link
                        href="/sessions"
                        className="text-white transition hover:text-primary"
                    >
                        Sessions
                    </Link>
                </div>

                <div className="flex gap-8">
                    <NavbarSearch />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setAuthModal("register")}
                            className="rounded-full bg-primary px-5.5 py-3.5 text-[14px] font-extrabold text-white transition hover:bg-primary-hover"
                        >
                            Sign Up
                        </button>

                        <button
                            type="button"
                            onClick={() => setAuthModal("login")}
                            className="rounded-full bg-white px-5.5 py-3.5 text-[14px] font-extrabold text-black"
                        >
                            Log In
                        </button>
                    </div>
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