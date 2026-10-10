"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/providers/auth-provider";
import { AuthInput } from "@/components/auth/AuthInput";
import { updateProfile } from "@/lib/api/profile";
import { AxiosError } from "axios";
import { useState } from "react";
import { User, Venue } from "@/lib/api/types";


type FormValues = {
    fullName: string;
    phone: string;
    dateOfBirth: string;
    venueId: string;
};

type ProfileErrorResponse = {
    message?: string;
    errors?: Record<string, string[]>;
};

export function ProfileForm({ venues = [] }: { venues?: Venue[] }) {
    const { user } = useAuth();
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");
    const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, dirtyFields },
    } = useForm<FormValues>({
        defaultValues: {
            fullName: user?.fullName ?? "",
            phone: "",
            dateOfBirth: "",
            venueId: "",
        },
    });

    if (!user) return null;

    const venueId = watch("venueId");

    async function onSubmit(values: FormValues) {
        setSubmitError("");
        setSubmitSuccess("");
        setServerErrors({});

        try {
            const updatedUser: User = await updateProfile({
                fullName: values.fullName.trim(),
                mobileNumber: values.phone.replace(/\s/g, ""),
                dateOfBirth: values.dateOfBirth,
                preferredVenueId: values.venueId ? Number(values.venueId) : "",
            });

            setSubmitSuccess("Profile saved successfully.");

            console.log("Updated profile:", updatedUser);
        } catch (error) {
            const axiosError = error as AxiosError<ProfileErrorResponse>;
            const response = axiosError.response?.data;

            if (axiosError.response?.status === 422 && response?.errors) {
                const fieldErrors: Record<string, string> = {};

                for (const [field, messages] of Object.entries(response.errors)) {
                    fieldErrors[field] = messages[0];
                }

                setServerErrors(fieldErrors);
                return;
            }

            if (axiosError.response?.status === 401) {
                setSubmitError("Your session has expired. Please log in again.");
                return;
            }

            setSubmitError(response?.message ?? "Failed to save profile. Please try again.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-220 flex-col gap-4.5"
        >
            <AuthInput
                id="fullName"
                label="Full name"
                type="text"
                placeholder="e.g. Text"
                error={errors.fullName?.message}
                registration={register("fullName", {
                    required: "Name is required",
                    minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                    },
                    maxLength: {
                        value: 50,
                        message: "Name must not exceed 50 characters",
                    },
                })}
            />

            <AuthInput
                id="email"
                label="Email"
                type="email"
                disabled
                hint="Set at registration and cannot be changed"
                registration={{ defaultValue: user.email }}
            />

            <AuthInput
                id="phone"
                label="Mobile number"
                type="tel"
                placeholder="e.g. 555 123 456"
                error={errors.phone?.message}
                valid={!!dirtyFields.phone}
                registration={register("phone", {
                    required: "Mobile number is required",
                    validate: (value) => {
                        const phone = value.replace(/\s/g, "");

                        if (!/^5/.test(phone)) {
                            return "Georgian mobile numbers must start with 5";
                        }

                        if (!/^\d{9}$/.test(phone)) {
                            return "Mobile number must be exactly 9 digits";
                        }

                        return true;
                    },
                })}
            />

            <AuthInput
                id="dateOfBirth"
                label="Date of birth"
                type="date"
                inputClassName="[color-scheme:dark]"
                error={errors.dateOfBirth?.message}
                registration={register("dateOfBirth", {
                    required: "Date of birth is required",
                    validate: (value) => {
                        const dob = new Date(`${value}T00:00:00`);
                        const today = new Date();

                        if (!value || Number.isNaN(dob.getTime()) || dob > today) {
                            return "Please enter a valid date of birth";
                        }

                        const cutoff = new Date(
                            today.getFullYear() - 12,
                            today.getMonth(),
                            today.getDate()
                        );

                        if (dob > cutoff) {
                            return "You must be at least 12 years old to create an account";
                        }

                        return true;
                    },
                })}
            />

            <div className="flex flex-col gap-2.5 font-semibold">
                <label htmlFor="venueId" className="text-label-s text-muted">
                    Preferred Venue (Optional)
                </label>
                <div className="relative">
                    <select
                        id="venueId"
                        {...register("venueId")}
                        className={`w-full appearance-none rounded-xl border border-transparent bg-surface px-4 py-3 pr-10 text-label-s focus:outline-none focus:ring-0 ${venueId ? "text-white" : "text-text-muted"
                            }`}
                    >
                        <option value="">e.g. Text</option>
                        {venues.map((venue) => (
                            <option key={venue.id} value={venue.id}>
                                {venue.name}
                            </option>
                        ))}
                    </select>

                    <svg
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M2 4.5L6 8.5L10 4.5" />
                    </svg>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4.5 w-fit rounded-full bg-primary px-5.5 py-3.5 text-[14px] font-extrabold text-white transition hover:bg-primary-hover disabled:opacity-60"
            >
                {isSubmitting ? "Saving..." : "Save changes"}
            </button>


            {submitError && (
                <p role="alert" className="text-sm text-red-400">
                    {submitError}
                </p>
            )}

            {submitSuccess && (
                <p role="status" className="text-sm text-green-400">
                    {submitSuccess}
                </p>
            )}
        </form>
    );
}