import React from "react";
import Link from "next/link";
import requestPasswordReset from "@/lib/auth/actions";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-bg-card rounded-2xl shadow-card p-8 border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-bg-muted rounded-full mb-4">
            <span className="text-2xl">🔑</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Reset Password
          </h1>
          <p className="text-text-secondary">
            Enter your email and we'll send you a link to get back into your
            account.
          </p>
        </div>

        {/* Form using Server Action */}
        <form action={requestPasswordReset} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 bg-bg-muted border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              placeholder="coffee-lover@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-btn-gradient text-text-light font-semibold rounded-xl shadow-soft hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="text-sm text-primary font-bold hover:underline flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
