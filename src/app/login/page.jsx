"use client";

import React from "react";
import Link from "next/link";
import LoginButton from "@/components/Auth/LoginBtn/LoginBtn";
import { useRouter } from "next/navigation";
import { Login } from "@/lib/login/actions";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await Login(formData);

    if (result?.error) {
      alert(result.error);
    } else {
      router.refresh();

      router.push("/profile");
    }
  }
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-bg-card rounded-2xl shadow-card p-8 border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-text-secondary">
            Please enter your details to sign in
          </p>
        </div>

        {/* Form using Server Action */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 bg-bg-muted border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              placeholder="name@cafe.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2.5 bg-bg-muted border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-text-secondary">
              <input
                type="checkbox"
                className="mr-2 rounded border-border text-primary focus:ring-primary"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-accent font-medium hover:text-accent-hover transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <LoginButton />
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-text-secondary text-sm">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-primary font-bold hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
