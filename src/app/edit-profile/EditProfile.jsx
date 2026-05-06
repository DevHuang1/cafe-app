"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditProfile() {
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setFormData(data);
    }

    getUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const confirmed = window.confirm(
      "Save changes?"
    );

    if (!confirmed) return;

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    await res.json();

    alert("Profile updated successfully!");

    router.push("/profile");
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-[#F6F4F2] flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F4F2] px-4 py-10">
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="bg-gradient-to-r from-[#6B4226] to-[#8B5E3C] px-6 py-8 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <p className="mt-1 text-white/80">
                Update your cafe account information.
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white/40 bg-[#C08A5D] shadow-lg">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                    {formData.name.charAt(0)}
                  </div>
                )}
              </div>

              <label className="mt-3 inline-block cursor-pointer rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-[#6B4226] transition hover:bg-[#EFEAE6]">
                Change
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

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
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
              onChange={handleChange} disabled
            />

            <InputField
              label="Shift"
              name="shift"
              value={formData.shift}
              onChange={handleChange} disabled
            />

            <InputField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange} disabled
            />

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#6B6B6B]">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-xl border border-[#E5E1DC] bg-[#F6F4F2] px-4 py-2.5 text-[#2D2A26] outline-none transition focus:border-[#C08A5D] focus:ring-2 focus:ring-[#C08A5D]/30"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-xl bg-[#C08A5D] px-6 py-2.5 font-semibold text-white transition hover:bg-[#A8744B]"
            >
              Save Changes
            </button>

            <Link
              href="/profile"
              className="rounded-xl border border-[#E5E1DC] px-6 py-2.5 font-semibold text-[#2D2A26] transition hover:bg-[#EFEAE6]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
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
        value={value}
        onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-xl border px-4 py-2.5 outline-none transition
        ${disabled
          ? "bg-[#EFEAE6] text-[#6B6B6B] border-[#E5E1DC] cursor-not-allowed"
          : "bg-[#F6F4F2] text-[#2D2A26] border-[#E5E1DC] focus:border-[#C08A5D] focus:ring-2 focus:ring-[#C08A5D]/30"
        }`} 
      />
    </div>
  );
}