"use client";

import Image from "next/image";
import Link from "next/link";

type User = {
    username: string;
    fullName?: string | null;
    email: string;
    avatar?: string | null;
    profileComplete?: boolean;
};

type UserMenuModalProps = {
    user: User;
    onClose: () => void;
    onLogout: () => Promise<void> | void;
};

export default function UserMenuModal({
    user,
    onClose,
    onLogout,
}: UserMenuModalProps) {
    return (
        <div
            className="fixed inset-0 z-40"
            onClick={onClose}
        >
            <div
                className="absolute right-15 top-20 w-[320px] rounded-xl bg-background px-5 pt-5 pb-2 text-white shadow-xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col gap-5">
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

                        <div className="flex flex-col">
                            <p className="text-label-m font-bold">
                                {user.fullName || user.username}
                            </p>

                            <p className="mt-1 text-label-s text-white/60">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {user.profileComplete === false && (
                        <div className="rounded-[10px] bg-warning/10 px-3 py-2.5 flex flex-col gap-0.5">
                            <p className="text-label-m text-warning">
                                Profile Incomplete
                            </p>
                            <p className="text-body-s text-text-muted">
                                Please complete your profile to enable booking
                            </p>
                        </div>
                    )}
                </div>

                <div className="-mx-5 flex flex-col mt-2">
                    <Link
                        href="/profile"
                        onClick={onClose}
                        className="flex items-center gap-2 px-5 py-3 transition hover:bg-surface"
                    >
                        <Image src="/icons/profile.svg" alt="" width={11.37} height={12} />
                        <span className="text-label-m font-bold">Profile</span>
                    </Link>

                    <Link
                        href="/profile?tab=tickets"
                        onClick={onClose}
                        className="flex items-center gap-2 px-5 py-3 transition hover:bg-surface"
                    >
                        <Image src="/icons/ticket.svg" alt="" width={20} height={20} />
                        <span className="text-label-m font-bold">My Tickets</span>
                    </Link>

                    <div className="my-1 border-t border-white/10" />

                    <button
                        type="button"
                        onClick={async () => {
                            onClose();
                            await onLogout();
                        }}
                        className="group flex w-full items-center gap-2 px-5 py-3 text-left transition hover:bg-surface hover:text-primary"
                    >
                        <Image src="/icons/logout.svg" alt="" width={20} height={20} />
                        <span className="text-label-m font-bold">Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
}