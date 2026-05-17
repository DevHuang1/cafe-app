"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditProfile() {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/profile");

        if (!res.ok) {
          throw new Error("Failed to load profile");
        }

        const data = await res.json();
        setFormData(data);
      } catch {
        setError("Could not load profile details.");
      }
    }

    getUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  async function saveProfile() {
    setShowConfirm(false);

    try {
      setSaving(true);

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      router.push("/profile");
    } catch {
      toast.error("Could not save profile changes.");
    } finally {
      setSaving(false);
    }
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F6F4F2] flex items-center justify-center px-4">
        <div className="rounded-3xl bg-white p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <h1 className="text-xl font-bold text-[#2D2A26]">
            Something went wrong
          </h1>

          <p className="mt-2 text-[#6B6B6B]">{error}</p>

          <Link
            href="/profile"
            className="mt-6 inline-block rounded-xl bg-[#C08A5D] px-6 py-2.5 font-semibold text-white transition hover:bg-[#A8744B]"
          >
            Back to Profile
          </Link>
        </div>
      </main>
    );
  }

  if (!formData) {
    return <EditProfileSkeleton />;
  }

  return (
    <main className="min-h-screen bg-[#F6F4F2] px-4 py-6 sm:py-10">
      <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
        <div className="relative bg-gradient-to-br from-[#6B4226] via-[#7A4D30] to-[#8B5E3C] px-6 py-8 text-white sm:px-10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,#ffffff,transparent_35%)]" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/70">
                Cafe Account
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Edit Profile
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
                Update your personal cafe account information.
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white/40 bg-[#C08A5D] shadow-lg">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name || "Profile photo"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                    {formData.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {formData.name || "Unknown User"}
                </p>

                <p className="text-xs text-white/70">
                  {formData.role || "Staff"}
                </p>

                <label className="mt-3 inline-block cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#6B4226] transition hover:bg-[#EFEAE6] active:scale-95">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowConfirm(true);
          }}
          className="p-5 sm:p-8 lg:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <InputField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <InputField
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              disabled
            />

            <InputField
              label="Shift"
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              disabled
            />

            <InputField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled
            />

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#6B6B6B]">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                rows="4"
                placeholder="Enter address"
                className="w-full resize-none rounded-xl border border-[#E5E1DC] bg-[#F6F4F2] px-4 py-3 text-[#2D2A26] outline-none transition focus:border-[#C08A5D] focus:ring-2 focus:ring-[#C08A5D]/30"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/profile"
              className="rounded-xl border border-[#E5E1DC] px-6 py-3 text-center font-semibold text-[#2D2A26] transition hover:bg-[#EFEAE6]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#C08A5D] px-6 py-3 font-semibold text-white transition hover:bg-[#A8744B] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F6F4F2] text-2xl">
              ☕
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#2D2A26]">
              Save Changes?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">
              Your cafe profile information will be updated permanently.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-xl border border-[#E5E1DC] px-5 py-3 font-semibold text-[#2D2A26] transition hover:bg-[#EFEAE6]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveProfile}
                disabled={saving}
                className="rounded-xl bg-[#C08A5D] px-5 py-3 font-semibold text-white transition hover:bg-[#A8744B] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function InputField({ label, name, value, onChange, type = "text", disabled }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#6B6B6B]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
          disabled
            ? "cursor-not-allowed border-[#E5E1DC] bg-[#EFEAE6] text-[#6B6B6B]"
            : "border-[#E5E1DC] bg-[#F6F4F2] text-[#2D2A26] focus:border-[#C08A5D] focus:ring-2 focus:ring-[#C08A5D]/30"
        }`}
      />
    </div>
  );
}

function EditProfileSkeleton() {
  return (
    <main className="min-h-screen bg-[#F6F4F2] px-4 py-6 sm:py-10">
      <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
        <div className="bg-gradient-to-br from-[#6B4226] via-[#7A4D30] to-[#8B5E3C] px-6 py-8 sm:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-4">
              <div className="h-4 w-36 animate-pulse rounded bg-white/20" />
              <div className="h-9 w-56 animate-pulse rounded bg-white/25" />
              <div className="h-4 w-72 max-w-full animate-pulse rounded bg-white/20" />
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
              <div className="h-20 w-20 animate-pulse rounded-full bg-white/25" />
              <div className="space-y-3">
                <div className="h-4 w-28 animate-pulse rounded bg-white/25" />
                <div className="h-3 w-20 animate-pulse rounded bg-white/20" />
                <div className="h-9 w-28 animate-pulse rounded-lg bg-white/25" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index}>
                <div className="mb-2 h-4 w-24 animate-pulse rounded bg-[#E5E1DC]" />
                <div className="h-12 animate-pulse rounded-xl bg-[#F6F4F2]" />
              </div>
            ))}

            <div className="sm:col-span-2">
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-[#E5E1DC]" />
              <div className="h-28 animate-pulse rounded-xl bg-[#F6F4F2]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}