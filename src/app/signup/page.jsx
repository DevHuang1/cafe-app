"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Coffee, User, ShieldCheck, Mail, Lock, BadgeId } from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import Signup from "@/lib/signup/actions";
import OtpModal from "@/components/Auth/OTPModal";

export default function SignUpPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("customer");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      formData.append("role", role);
      setUserEmail(formData.get("email"));
      await Signup(formData);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.verifyOtp({
        email: userEmail,
        token: otp,
        type: "signup",
      });

      if (error) {
        alert("Invalid code. Please try again.");
        return;
      }

      if (data.session) {
        window.location.href = role === "staff" ? "/staff/dashboard" : "/menu";
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 font-sans">
      {/* Decorative background element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-[#E8E2DA] relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
            <Coffee className="text-accent w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#3E2723] mb-2">
            Brewing Happiness
          </h1>
          <p className="text-gray-500 italic">
            Join our specialty coffee community
          </p>
        </div>

        {/* --- TACTILE ROLE SELECTOR --- */}
        <div className="relative flex bg-[#F5F1EE] p-1.5 rounded-2xl mb-8 border border-[#E8E2DA]">
          {/* Sliding Highlight */}
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${
              role === "staff" ? "translate-x-full" : "translate-x-0"
            }`}
          />

          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${
              role === "customer" ? "text-accent" : "text-gray-400"
            }`}
          >
            <User size={18} />
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("staff")}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${
              role === "staff" ? "text-accent" : "text-gray-400"
            }`}
          >
            <ShieldCheck size={18} />
            Staff
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                required
                className="w-full px-4 py-3 bg-white border border-[#E8E2DA] rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-300"
                placeholder="Aung"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                required
                className="w-full px-4 py-3 bg-white border border-[#E8E2DA] rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-300"
                placeholder="Kyaw"
              />
            </div>
          </div>

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
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8E2DA] rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-300"
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
                minLength={6}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8E2DA] rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-300"
                placeholder="At least 6 characters"
              />
            </div>
          </div>

          {role === "staff" && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
                Staff ID Number
              </label>
              <div className="relative">
                <BadgeId
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <input
                  name="employee_id"
                  type="text"
                  required={role === "staff"}
                  className="w-full pl-11 pr-4 py-3 bg-[#FFF8F1] border border-accent/20 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-300"
                  placeholder="e.g. STF-2024-001"
                />
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-2xl shadow-[0_8px_20px_-6px_rgba(var(--accent-rgb),0.5)] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading
                ? "Preparing your account..."
                : role === "staff"
                  ? "Register Staff Member"
                  : "Join the Community"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Already part of the family?{" "}
          <Link href="/login" className="text-accent font-bold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>

      <OtpModal
        isOpen={isModalOpen}
        email={userEmail}
        onVerify={handleVerifyOtp}
      />
    </div>
  );
}
