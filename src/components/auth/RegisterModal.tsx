"use client"

import { useAuth } from "@/providers/auth-provider";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@/lib/api/auth";
import { AuthModal } from "./AuthModal";
import { AuthFooter } from "./AuthFooter";
import { AuthInput } from "./AuthInput";
import Image from "next/image";


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
    const avatarInputRef = useRef<HTMLInputElement>(null);


    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, touchedFields, isSubmitting }
    } = useForm<RegisterFormData>({ mode: "onBlur", })

    const avatarRegister = register("avatar", {
        validate: {
            format: (files) => {
                const file = files?.[0];

                if (!file) return true;

                return (
                    ["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
                    "Avatar must be JPG, PNG, or WEBP"
                );
            }
        },
        onChange: handleAvatarChange,
    });

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
        <AuthModal
            title="Sign Up"
            subtitle="Welcome to Kino XII"
            onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

                <div
                    className="flex cursor-pointer gap-3"
                    onClick={() => avatarInputRef.current?.click()}
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#2A2C3D]">
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Avatar preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <Image
                                src="/icons/upload.svg"
                                alt=""
                                width={12}
                                height={11}
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                avatarInputRef.current?.click();
                            }}
                            className="text-left text-[14px] font-extrabold text-white"
                        >
                            {avatarPreview ? "Change avatar" : "Upload avatar (optional)"}
                        </button>

                        <p className="text-[12px] text-[#A9A9A9]">
                            JPG, PNG or WEBP
                        </p>
                    </div>

                    <input
                        {...avatarRegister}
                        ref={(element) => {
                            avatarRegister.ref(element);
                            avatarInputRef.current = element;
                        }}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        className="hidden"
                    />
                </div>

                {errors.avatar && (
                    <p className="text-sm text-[#EC3013]">
                        {errors.avatar.message}
                    </p>
                )}


                <div className="flex flex-col gap-6">
                    <AuthInput
                        id="register-username"
                        label="Username"
                        type="text"
                        placeholder="user"
                        registration={register("username", {
                            required: "username",
                            minLength: {
                                value: 3,
                                message: "At least 3 characters",
                            },
                        })}
                        error={errors.username?.message}
                        valid={touchedFields.username && !errors.username}
                    />

                    <AuthInput
                        id="register-email"
                        label="Email"
                        type="email"
                        placeholder="example@gmail.com"
                        registration={register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Please enter a valid email address",
                            },
                        })}
                        error={errors.email?.message}
                        valid={touchedFields.email && !errors.email}
                    />

                    <div className="flex justify-between gap-4">
                        <AuthInput
                            id="register-password"
                            label="password"
                            type="password"
                            placeholder="••••••••"
                            registration={register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 3,
                                    message: "Password must be at least 3 characters",
                                },
                            })}
                            error={errors.password?.message}
                            valid={touchedFields.password && !errors.password}
                        />

                        <AuthInput
                            id="register-confirm-password"
                            label="Confirm password"
                            type="password"
                            placeholder="••••••••"
                            registration={register("password_confirmation", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            error={errors.password_confirmation?.message}
                            valid={touchedFields.password_confirmation && !errors.password_confirmation}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#505261] rounded-full px-5.5 py-3 text-[#A9A9A9] font-extrabold text-[14px] disabled:opacity-50"
                >
                    {isSubmitting ? "Signing up..." : "Sign up"}
                </button>
            </form>
            <AuthFooter
                text="Already have an account?"
                action="Log in"
                onClick={onLogin}
            />
        </AuthModal>
    );
}