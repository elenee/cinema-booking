"use client";

import { useState } from "react";
import { LoginModal } from "../auth/LoginModal";
import { RegisterModal } from "../auth/RegisterModal";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
    const [authModal, setAuthModal] = useState<"login" | "register" | null>(null,);

    return (
        <>
            <nav className="flex items-center justify-between px-15 py-10">
                <div className="flex gap-9 items-center text-white ">
                    <h1 className="uppercase font-extrabold text-[20px]">kino <span className="text-primary">xii</span></h1>
                    <Link href="/sessions" className="text-white hover:text-primary transition">
                        Sessions
                    </Link>
                </div>
                <div className="flex gap-8">
                    <div className="flex items-center gap-1 bg-white/10 rounded-full pl-4 py-1.5 pr-44 ">
                        <Image
                            src="/icons/search-icon.svg"
                            alt=""
                            width={14}
                            height={14}
                        />
                        <p className="text-white text-[14px] font-normal">Search films and live events</p>
                    </div>
                    <div className="flex gap-3">
                        <button type="button"
                            onClick={() => setAuthModal('register')}
                            className="bg-primary transition hover:bg-primary-hover rounded-full text-white px-5.5 py-3.5 text-[14px] font-extrabold"
                        >
                            Sign Up
                        </button>
                        <button type="button" onClick={() => setAuthModal('login')}
                            className="bg-white rounded-full text-black px-5.5 py-3.5 text-[14px] font-extrabold"
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