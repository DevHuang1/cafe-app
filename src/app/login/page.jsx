"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Coffee, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { Login } from "@/lib/login/actions";
import LoginButton from "@/components/Auth/LoginBtn/LoginBtn";
import Navbar from "@/components/Home/NavbarWrapper";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await Login(formData);

    if (!result?.success) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.refresh();
      setTimeout(() => router.push("/profile"), 50);
    }
  }

  return (
    <>
      <style>{`
        .login-input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          background: white;
          border: 1.5px solid #E8E2DA;
          border-radius: 12px;
          color: #3E2723;
          font-size: 15px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.2s;
        }
        .login-input::placeholder { color: #c4b5a5; }
        .login-input:hover {
          border-color: #C08A5D;
          background: #fffaf7;
        }
        .login-input:focus {
          border-color: #8B5E3C;
          box-shadow: 0 0 0 4px rgba(139,94,60,0.1);
          background: #fffaf7;
        }

        .forgot-link {
          color: #8B5E3C;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .forgot-link:hover {
          color: #6B4226;
          text-decoration: underline;
        }

        .signup-link {
          color: #8B5E3C;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s, gap 0.2s;
        }
        .signup-link:hover {
          color: #6B4226;
          gap: 8px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .checkbox-label:hover { color: #8B5E3C; }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #8B5E3C;
          color: white;
          font-size: 16px;
          font-weight: 700;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .submit-btn:hover {
          background: #7A5233;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139,94,60,0.35);
        }
        .submit-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: none;
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>

      {/* Navbar — no login button, show home icon instead */}
      <Navbar initialUser={null} initialProfile={null} hideAuth />

      <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-28">

        {/* Decorative blobs */}
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
          style={{ background: "#8B5E3C", filter: "blur(120px)" }} />
        <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
          style={{ background: "#C08A5D", filter: "blur(120px)" }} />

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-[#E8E2DA] relative z-10">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ background: "rgba(139,94,60,0.1)" }}>
              <Coffee className="w-8 h-8 text-[#8B5E3C]" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#3E2723] mb-2">
              Welcome Back
            </h1>
            <p className="italic text-gray-400 text-[15px]">
              The aroma of fresh coffee awaits
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle size={18} />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  className="login-input"
                  placeholder="coffee-lover@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  className="login-input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="checkbox-label">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#8B5E3C]" />
                Remember me
              </label>
              <Link href="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <div className="pt-1">
              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>

          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#F5F1EE] text-center">
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="signup-link">
                Sign up for free <ArrowRight size={14} />
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}