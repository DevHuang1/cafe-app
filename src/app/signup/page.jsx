"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Coffee, User, ShieldCheck, Mail, Lock, IdCard } from "lucide-react";
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
      if (error) { alert("Invalid code. Please try again."); return; }
      if (data.session) {
        window.location.href = role === "staff" ? "/staff/dashboard" : "/menu";
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .su-input {
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
        .su-input-plain {
          width: 100%;
          padding: 14px 16px;
          background: white;
          border: 1.5px solid #E8E2DA;
          border-radius: 12px;
          color: #3E2723;
          font-size: 15px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.2s;
        }
        .su-input::placeholder,
        .su-input-plain::placeholder { color: #c4b5a5; }
        .su-input:hover,
        .su-input-plain:hover {
          border-color: #C08A5D;
          background: #fffaf7;
        }
        .su-input:focus,
        .su-input-plain:focus {
          border-color: #8B5E3C;
          box-shadow: 0 0 0 4px rgba(139,94,60,0.1);
          background: #fffaf7;
        }

        .su-input-staff {
          width: 100%;
          padding: 14px 16px 14px 44px;
          background: #FFF8F1;
          border: 1.5px solid rgba(139,94,60,0.25);
          border-radius: 12px;
          color: #3E2723;
          font-size: 15px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .su-input-staff::placeholder { color: #c4b5a5; }
        .su-input-staff:hover { border-color: #C08A5D; }
        .su-input-staff:focus {
          border-color: #8B5E3C;
          box-shadow: 0 0 0 4px rgba(139,94,60,0.1);
        }

        .su-btn {
          width: 100%;
          padding: 15px;
          background: #8B5E3C;
          color: white;
          font-size: 16px;
          font-weight: 700;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .su-btn:hover {
          background: #7A5233;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139,94,60,0.35);
        }
        .su-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: none;
        }
        .su-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .role-btn {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 0;
          font-size: 14px;
          font-weight: 600;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 10px;
          transition: color 0.2s;
        }
        .role-btn:hover { opacity: 0.85; }
        .role-btn:active { transform: scale(0.97); }

        .signin-link {
          color: #8B5E3C;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }
        .signin-link:hover {
          color: #6B4226;
          text-decoration: underline;
        }
      `}</style>

      <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-28 pb-12 relative overflow-hidden">

        {/* Decorative blobs */}
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
          style={{ background: "#8B5E3C", filter: "blur(120px)" }} />
        <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
          style={{ background: "#C08A5D", filter: "blur(120px)" }} />

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-[#E8E2DA] relative z-10">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ background: "rgba(139,94,60,0.1)" }}>
              <Coffee className="w-8 h-8 text-[#8B5E3C]" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#3E2723] mb-2">
              Brewing Happiness
            </h1>
            <p className="text-gray-400 italic text-[15px]">
              Join our specialty coffee community
            </p>
          </div>

          {/* Role selector */}
          <div className="relative flex bg-[#F5F1EE] p-1.5 rounded-2xl mb-8 border border-[#E8E2DA]">
            <div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out"
              style={{ transform: role === "staff" ? "translateX(calc(100% + 12px))" : "translateX(0)" }}
            />
            <button
              type="button"
              onClick={() => setRole("customer")}
              className="role-btn"
              style={{ color: role === "customer" ? "#8B5E3C" : "#9ca3af" }}
            >
              <User size={18} /> Customer
            </button>
            <button
              type="button"
              onClick={() => setRole("staff")}
              className="role-btn"
              style={{ color: role === "staff" ? "#8B5E3C" : "#9ca3af" }}
            >
              <ShieldCheck size={18} /> Staff
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  className="su-input-plain"
                  placeholder="Aung"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  required
                  className="su-input-plain"
                  placeholder="Kyaw"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input name="email" type="email" required className="su-input" placeholder="coffee-lover@example.com" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input name="password" type="password" required minLength={6} className="su-input" placeholder="At least 6 characters" />
              </div>
            </div>

            {/* Staff ID */}
            {role === "staff" && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037] ml-1">
                  Staff ID Number
                </label>
                <div className="relative">
                  <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C08A5D]" size={18} />
                  <input name="employee_id" type="text" required className="su-input-staff" placeholder="e.g. STF-2024-001" />
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button type="submit" disabled={loading} className="su-btn">
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
            <Link href="/login" className="signin-link">Sign in here</Link>
          </p>

        </div>
      </div>

      <OtpModal
        isOpen={isModalOpen}
        email={userEmail}
        onVerify={handleVerifyOtp}
      />
    </>
  );
}