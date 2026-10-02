"use client"

import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@/lib/api/auth";

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    avatar?: FileList;
}

interface RegisterModalProps {
    onClose: () => void
    onLogin: () => void
}


export function RegisterModal({ onClose, onLogin }: RegisterModalProps) {
    const { setAuth } = useAuth()
    const [serverError, setServerError] = useState("");
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>()

    const password = watch("password");

    async function onSubmit(data: RegisterFormData) {
        setServerError("")

        try {
            const res = await registerUser({
                username: data.username,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
                avatar: data.avatar?.[0],
            });

            setAuth(res.token, res.user)
            onClose()
        } catch (error: any) {
            const response = error.response;

            if (response?.status === 422 && response.data?.errors) {
                Object.entries(response.data.errors).forEach(
                    ([field, messages]) => {
                        setError(field as keyof RegisterFormData, {
                            type: "server",
                            message: (messages as string[])[0],
                        });
                    },
                );

                return;
            }

            setServerError(
                response?.data?.message ||
                "Something went wrong. Please try again.",
            );
        }
    }

    function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file) {
            setAvatarPreview(null)
            return
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ]
        if (!allowedTypes.includes(file.type)) {
            setAvatarPreview(null)
            return
        }

        setAvatarPreview(URL.createObjectURL(file))
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-xl bg-white p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Sign Up</h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <label htmlFor="register-username">Username</label>

                        <input
                            id="register-username"
                            type="text"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters",
                                },
                            })}
                            className="mt-1 w-full rounded border px-3 py-2"
                        />

                        {errors.username && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="register-email">Email</label>

                        <input
                            id="register-email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Please enter a valid email address",
                                },
                            })}
                            className="mt-1 w-full rounded border px-3 py-2"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="register-password">Password</label>

                        <input
                            id="register-password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 3,
                                    message: "Password must be at least 3 characters",
                                },
                            })}
                            className="mt-1 w-full rounded border px-3 py-2"
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="register-confirm-password">
                            Confirm Password
                        </label>

                        <input
                            id="register-confirm-password"
                            type="password"
                            {...register("password_confirmation", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            className="mt-1 w-full rounded border px-3 py-2"
                        />

                        {errors.password_confirmation && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password_confirmation.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="register-avatar">Avatar</label>

                        <input
                            id="register-avatar"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            {...register("avatar", {
                                validate: {
                                    format: (files) => {
                                        const file = files?.[0];

                                        if (!file) {
                                            return true;
                                        }

                                        return (
                                            [
                                                "image/jpeg",
                                                "image/png",
                                                "image/webp",
                                            ].includes(file.type) ||
                                            "Avatar must be JPG, PNG, or WebP"
                                        );
                                    },
                                    size: (files) => {
                                        const file = files?.[0];

                                        if (!file) {
                                            return true;
                                        }

                                        return (
                                            file.size <= 2 * 1024 * 1024 ||
                                            "Avatar must be smaller than 2MB"
                                        );
                                    },
                                },
                                onChange: handleAvatarChange,
                            })}
                            className="mt-1 w-full"
                        />

                        {avatarPreview && (
                            <img
                                src={avatarPreview}
                                alt="Avatar preview"
                                className="mt-3 h-20 w-20 rounded-full object-cover"
                            />
                        )}

                        {errors.avatar && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.avatar.message}
                            </p>
                        )}
                    </div>

                    {serverError && (
                        <p className="text-sm text-red-500">
                            {serverError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-50"
                    >
                        {isSubmitting ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <span>Already have an account? </span>

                    <button
                        type="button"
                        onClick={onLogin}
                        className="underline"
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
}