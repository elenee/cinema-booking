"use client";

import { login } from "@/lib/api/auth";
import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthModal } from "./AuthModal";
import { AuthInput } from "./AuthInput";
import { AuthFooter } from "./AuthFooter";

interface LoginFormData {
  email: string;
  password: string
}

interface LoginModalProps {
  onClose: () => void
  onSignUp: () => void
}


export function LoginModal({ onClose, onSignUp }: LoginModalProps) {
  const { setAuth } = useAuth()
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, setError, formState: { errors, touchedFields, isSubmitting } } = useForm<LoginFormData>({ mode: "onBlur", })

  async function onSubmit(data: LoginFormData) {
    setServerError("")
    try {
      const res = await login(data)
      setAuth(res.token, res.user)
      onClose()
    } catch (error: any) {
      const response = error.response

      if (response.status === 422 && response.data.errors) {
        Object.entries(response.data.errors).forEach(
          ([field, message]) => {
            setError(field as keyof LoginFormData, {
              type: "server",
              message: (message as string[])[0]
            })
          }
        );
        return
      }

      if (response.status === 401) {
        setServerError(
          response?.data?.message || "Invalid credentials"
        );
        return
      }

      setServerError("Something went wrong. Please try again.");
    }
  }


  return (
    <AuthModal
      title="Log In"
      subtitle="Welcome back to Kino XII"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">

          <AuthInput
            id="login-email"
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

        </div>

        <div className="flex flex-col gap-2.5 font-semibold">

          <AuthInput
            id="login-password"
            label="Password"
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

        </div>

        {serverError && (
          <p className="text-label-s text-red-500">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-text-disabled rounded-full px-5.5 py-3.5 text-text-muted text-button disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>
      <AuthFooter
        text="Don't have an account?"
        action="Sign Up"
        onClick={onSignUp}
      />
    </AuthModal>
  );
}
