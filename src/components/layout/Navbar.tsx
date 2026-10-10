"use client";

import { useState } from "react";
import Link from "next/link";
import { LoginModal } from "../auth/LoginModal";
import { RegisterModal } from "../auth/RegisterModal";
import { NavbarSearch } from "./NavbarSearch";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";
import UserMenuModal from "./UserMenuModal";

export function Navbar() {
    const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
    const { user, clearAuth } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-0 z-10 flex items-center justify-between bg-linear-to-b from-black from-0% via-black/51 via-80% to-black/0 to-100% px-15 py-6">
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

                    {user ? (
                        <button
                            type="button"
                            onClick={() => setIsUserMenuOpen((prev) => !prev)}
                            aria-expanded={isUserMenuOpen}
                            className="flex items-center gap-6 text-white transition hover:opacity-80"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt=""
                                            width={40}
                                            height={40}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-label-s">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    {user.profileComplete === false && (
                                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-warning" />
                                    )}
                                </div>

                                <span className="text-label-m">
                                    {user.fullName || user.username}
                                </span>
                            </div>

                            <Image
                                src="/icons/arrow-down.svg"
                                width={12}
                                height={12}
                                alt=""
                                className={`transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setAuthModal("register")}
                                className="rounded-full bg-primary px-5.5 py-3.25 text-button text-white transition hover:bg-primary-hover"
                            >
                                Sign Up
                            </button>

                            <button
                                type="button"
                                onClick={() => setAuthModal("login")}
                                className="rounded-full bg-white px-5.5 py-3.5 text-button text-black"
                            >
                                Log In
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {user && isUserMenuOpen && (
                <UserMenuModal
                    user={user}
                    onClose={() => setIsUserMenuOpen(false)}
                    onLogout={clearAuth}
                />
            )}

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