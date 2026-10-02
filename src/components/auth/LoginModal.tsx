
"use client";

import { login } from "@/lib/api/auth";
import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginFormData>()

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
        setServerError("Invalid Credentials")
        return
      }

      setServerError("Something went wrong. Please try again.");
    }
  }


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Log In</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="login-email">Email</label>

            <input
              id="login-email"
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
            <label htmlFor="login-password">Password</label>

            <input
              id="login-password"
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

          {serverError && (
            <p className="text-sm text-red-500">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span>Don't have an account? </span>

          <button
            type="button"
            onClick={onSignUp}
            className="underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
