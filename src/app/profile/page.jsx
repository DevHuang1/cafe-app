"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ProfileView() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (authUser) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (!error) setUser(data);
      }
      setLoading(false);
    }

    getUser();
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F4F2] flex items-center justify-center">
        <div className="text-[#6B4226] font-medium animate-pulse">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F6F4F2] flex flex-col items-center justify-center py-20">
        <p className="text-xl font-bold text-[#2D2A26]">User not found.</p>
        <Link href="/login" className="mt-4 text-[#C08A5D] hover:underline">Return to Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F4F2] px-4 py-10">
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="bg-gradient-to-r from-[#6B4226] to-[#8B5E3C] px-6 py-10 text-white">
          <div className="flex flex-col items-center text-center">
            <button
              onClick={() => setShowPhoto(true)}
              className="h-28 w-28 overflow-hidden rounded-full border-4 border-white/40 bg-[#C08A5D] shadow-lg transition hover:scale-105"
            >
              {user.image_url ? (
                <img
                  src={user.image_url}
                  alt={user.full_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white">
                  {user.full_name?.charAt(0) || "U"}
                </div>
              )}
            </button>

            <h1 className="mt-5 text-3xl font-bold">{user.full_name || "New User"}</h1>
            <p className="mt-1 rounded-full bg-white/15 px-4 py-1 text-sm">
              {user.role || "Staff"}
            </p>

            <Link
              href="/edit-profile"
              className="mt-6 rounded-xl bg-white px-6 py-2.5 font-semibold text-[#6B4226] transition hover:bg-[#EFEAE6]"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#2D2A26]">Account Details</h2>
          <p className="mt-1 text-sm text-[#6B6B6B]">
            Basic information for your cafe account.
          </p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ProfileItem label="Employee ID" value={user.employee_id || user.employeeId} />
            <ProfileItem label="Status" value={user.status} />
            <ProfileItem label="Email" value={user.email} />
            <ProfileItem label="Phone" value={user.phone} />
            <ProfileItem label="Address" value={user.address} />
            <ProfileItem
              label="Joined Date"
              value={user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
            />
          </div>
        </div>
      </div>

      {showPhoto && user.image_url && (
        <div
          onClick={() => setShowPhoto(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-pointer"
        >
          <img
            src={user.image_url}
            alt={user.full_name}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#E5E1DC] bg-[#F6F4F2] p-5 transition hover:-translate-y-1 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
      <p className="text-sm font-medium text-[#6B6B6B]">{label}</p>
      <p className="mt-2 font-semibold text-[#2D2A26]">{value || "N/A"}</p>
    </div>
  );
}