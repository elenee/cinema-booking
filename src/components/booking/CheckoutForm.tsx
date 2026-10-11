"use client";

import type { HoldData } from "@/lib/api/types";
import { useForm } from "react-hook-form";
import { AuthInput } from "../auth/AuthInput";

interface CheckoutFormProps {
    onSubmit: (formData: {
        fullName: string;
        email: string;
        mobileNumber: string;
        cardNumber: string;
        expiry: string;
        cvv: string;
    }) => void;
    isSubmitting: boolean;
    errorMessage: string | null;
}

export type CheckoutValues = {
    fullName: string;
    email: string;
    mobileNumber: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
};

export function CheckoutForm({
    onSubmit,
    isSubmitting,
    errorMessage,
}: CheckoutFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutValues>({ mode: "onTouched" });

    return (
        <form
            id="checkout-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4 pt-6 text-white"
        >
            <AuthInput
                id="fullName"
                label="Full Name"
                type="text"
                placeholder="e.g. Text"
                error={errors.fullName?.message}
                registration={register("fullName", { required: "Full name is required" })}
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <AuthInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="e.g. Text"
                    error={errors.email?.message}
                    registration={register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                    })}
                />
                <AuthInput
                    id="mobileNumber"
                    label="Mobile Number"
                    type="tel"
                    placeholder="e.g. Text"
                    error={errors.mobileNumber?.message}
                    registration={register("mobileNumber", { required: "Mobile number is required" })}
                />
            </div>

            <div className="space-y-4 border-t border-white/10 pt-4">
                <AuthInput
                    id="cardNumber"
                    label="Card Number"
                    type="text"
                    placeholder="e.g. Text"
                    error={errors.cardNumber?.message}
                    registration={register("cardNumber", {
                        required: "Card number is required",
                        pattern: { value: /^[\d ]{13,19}$/, message: "Enter a valid card number" },
                    })}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                    <AuthInput
                        id="expiry"
                        label="Expiry"
                        type="text"
                        placeholder="e.g. Text"
                        error={errors.expiry?.message}
                        registration={register("expiry", {
                            required: "Expiry is required",
                            pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Use MM/YY" },
                        })}
                    />
                    <AuthInput
                        id="cvv"
                        label="CVV"
                        type="password"
                        placeholder="e.g. Text"
                        error={errors.cvv?.message}
                        registration={register("cvv", {
                            required: "CVV is required",
                            pattern: { value: /^\d{3,4}$/, message: "3 or 4 digits" },
                        })}
                    />
                </div>
            </div>

            {errorMessage && (
                <p role="alert" className="text-sm text-red-400">{errorMessage}</p>
            )}
        </form>
    );
}