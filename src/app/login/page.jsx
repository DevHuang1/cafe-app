"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Coffee, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { Login } from "@/lib/login/actions";
import LoginButton from "@/components/Auth/LoginBtn/LoginBtn";

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

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.refresh();
      router.push("/profile");
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Decorative Café Blur */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-[#E8E2DA] relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
            <Coffee className="text-accent w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#3E2723] mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 italic">
            The aroma of fresh coffee awaits
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                name="email"
                type="email"
                required
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8E2DA] rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-300 text-[#3E2723]"
                placeholder="coffee-lover@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                name="password"
                type="password"
                required
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8E2DA] rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-300 text-[#3E2723]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-500 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[#E8E2DA] text-accent focus:ring-accent accent-accent transition-all"
              />
              <span className="group-hover:text-accent transition-colors">
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-accent font-semibold hover:text-accent-hover transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="pt-2">
            <LoginButton disabled={isLoading} />
          </div>
        </form>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-[#F5F1EE] text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="inline-flex items-center gap-1 text-accent font-bold hover:underline"
            >
              Sign up for free <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
