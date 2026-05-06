"use client";

import React, { useState } from "react";

export default function OtpModal({ isOpen, email, onVerify }) {
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-bg-card rounded-2xl shadow-card border border-border p-8 animate-in fade-in zoom-in duration-200">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-bg-muted rounded-full mb-4">
            <span className="text-2xl">☕</span>
          </div>
          <h2 className="text-xl font-bold text-primary">Verify Email</h2>
          <p className="text-sm text-text-secondary mt-1">
            Enter the code sent to{" "}
            <span className="font-semibold text-text-primary">{email}</span>
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center tracking-[1em] text-2xl font-bold py-3 bg-bg-muted border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none"
            placeholder="000000"
          />

          <button
            onClick={() => onVerify(otp)}
            className="w-full py-3 bg-btn-gradient text-text-light font-semibold rounded-xl shadow-soft hover:opacity-90 transition-opacity"
          >
            Verify & Finish
          </button>

          <button className="w-full text-sm text-accent font-medium hover:underline">
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
