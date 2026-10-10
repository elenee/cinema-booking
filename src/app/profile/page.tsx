"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { LoginModal } from "@/components/auth/LoginModal";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { MyTickets } from "@/components/profile/MyTickets";

function ProfileContent() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [showLogin, setShowLogin] = useState(true);

    const searchParams = useSearchParams();
    const [mainTab, setMainTab] = useState<"info" | "tickets">(
        searchParams.get("tab") === "tickets" ? "tickets" : "info"
    );
    const upcomingCount = 0;

    if (loading) {
        return (
            <main className="min-h-screen bg-background px-6 py-16 text-white">
                <p className="text-white/60">Loading profile...</p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-background">
                {showLogin && (
                    <LoginModal
                        onClose={() => {
                            setShowLogin(false);
                            router.push("/");
                        }}
                        onSignUp={() => {
                            setShowLogin(false);
                            router.push("/?auth=register");
                        }}
                    />
                )}
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background px-12.75 py-12 pt-30 text-white flex flex-col gap-10.5">
            <div className="flex flex-col gap-10.5">
                <div className="flex flex-col gap-7">
                    <h1 className="text-h1">My Profile</h1>

                    <div className="flex gap-7 border-b border-white/10">
                        <button
                            type="button"
                            onClick={() => setMainTab("info")}
                            className={`-mb-px border-b-2 pb-3 text-label-m transition ${mainTab === "info"
                                ? "border-primary text-white"
                                : "border-transparent text-white/60 hover:text-white"
                                }`}
                        >
                            Personal Information
                        </button>

                        <button
                            type="button"
                            onClick={() => setMainTab("tickets")}
                            className={`-mb-px flex items-center gap-3 border-b-2 pb-3 text-label-m transition ${mainTab === "tickets"
                                ? "border-primary text-white"
                                : "border-transparent text-white/60 hover:text-white"
                                }`}
                        >
                            My Tickets
                            {upcomingCount > 0 && (
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[12px] font-bold text-white">
                                    {upcomingCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {mainTab === "info" && <ProfileForm />}

                {mainTab === "tickets" && (
                    <section>
                        <MyTickets />
                    </section>
                )}
            </div>
        </main>
    );
}


export default function ProfilePage() {
    return (
        <Suspense fallback={<p>Loading profile...</p>}>
            <ProfileContent />
        </Suspense>
    );
}
