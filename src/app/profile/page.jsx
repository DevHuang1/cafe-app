"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfileView() {
  const [user, setUser] = useState(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/profile");

        if (!res.ok) {
          throw new Error("Failed to load profile");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("Could not load profile details.");
      }
    }

    getUser();
  }, []);

  if (error) {
    return (
      <main className="min-h-screen bg-[#F6F4F2] flex items-center justify-center px-4">
        <div className="rounded-3xl bg-white p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <h1 className="text-xl font-bold text-[#2D2A26]">Something went wrong</h1>
          <p className="mt-2 text-[#6B6B6B]">{error}</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return <ProfileSkeleton />;
  }

  return (
    <main className="min-h-screen bg-[#F6F4F2] px-4 py-6 sm:py-10">
      <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
        <div className="relative bg-gradient-to-br from-[#6B4226] via-[#7A4D30] to-[#8B5E3C] px-6 py-10 text-white sm:px-10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,#ffffff,transparent_35%)]" />

          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <button
              type="button"
              onClick={() => user.image && setShowPhoto(true)}
              className="h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white/40 bg-[#C08A5D] shadow-lg transition duration-300 hover:scale-105 active:scale-95 sm:h-32 sm:w-32"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "Profile photo"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white">
                  {user.name?.charAt(0) || "U"}
                </div>
              )}
            </button>

            <div className="flex-1">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/70">
                Cafe Profile
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {user.name || "Unknown User"}
              </h1>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
                  {user.role || "Staff"}
                </span>

                <span className="rounded-full bg-[#C08A5D]/80 px-4 py-1.5 text-sm font-medium">
                  {user.status || "Active"}
                </span>
              </div>
            </div>

            <Link
              href="/edit-profile"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-[#6B4226] shadow-sm transition hover:bg-[#EFEAE6] active:scale-95"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-[#2D2A26]">
                Account Details
              </h2>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                Basic information for your cafe account.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileItem label="Employee ID" value={user.employeeId} />
            <ProfileItem label="Status" value={user.status} />
            <ProfileItem label="Email" value={user.email} />
            <ProfileItem label="Phone" value={user.phone} />
            <ProfileItem label="Address" value={user.address} wide />
            <ProfileItem label="Joined Date" value={user.joinedDate} />
          </div>
        </div>
      </section>

      {showPhoto && (
        <div
          onClick={() => setShowPhoto(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setShowPhoto(false)}
            className="absolute right-5 top-5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
          >
            Close
          </button>

          <img
            onClick={(e) => e.stopPropagation()}
            src={user.image}
            alt={user.name || "Profile photo"}
            className="max-h-[85vh] max-w-[92vw] rounded-3xl object-contain shadow-2xl"
          />
        </div>
      )}
    </main>
  );
}

function ProfileItem({ label, value, wide }) {
  return (
    <div
      className={`rounded-2xl border border-[#E5E1DC] bg-[#F6F4F2] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_8px_22px_rgba(0,0,0,0.08)] ${
        wide ? "sm:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <p className="text-sm font-medium text-[#6B6B6B]">{label}</p>
      <p className="mt-2 break-words font-semibold text-[#2D2A26]">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-[#F6F4F2] px-4 py-6 sm:py-10">
      <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
        <div className="bg-gradient-to-br from-[#6B4226] via-[#7A4D30] to-[#8B5E3C] px-6 py-10 sm:px-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="h-28 w-28 animate-pulse rounded-full bg-white/25 sm:h-32 sm:w-32" />

            <div className="w-full flex-1 space-y-4">
              <div className="mx-auto h-4 w-32 animate-pulse rounded bg-white/20 sm:mx-0" />
              <div className="mx-auto h-8 w-56 animate-pulse rounded bg-white/25 sm:mx-0" />
              <div className="mx-auto h-8 w-28 animate-pulse rounded-full bg-white/20 sm:mx-0" />
            </div>

            <div className="h-12 w-32 animate-pulse rounded-xl bg-white/25" />
          </div>
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          <div className="h-7 w-48 animate-pulse rounded bg-[#E5E1DC]" />
          <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-[#E5E1DC]" />

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#E5E1DC] bg-[#F6F4F2] p-5"
              >
                <div className="h-4 w-24 animate-pulse rounded bg-[#E5E1DC]" />
                <div className="mt-4 h-5 w-40 animate-pulse rounded bg-[#E5E1DC]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}