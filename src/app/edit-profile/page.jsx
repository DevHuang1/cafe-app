"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import imageCompression from "browser-image-compression";

export default function EditProfile() {
  const [formData, setFormData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) setFormData(data);
      }
    }
    getUser();
  }, [supabase]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const options = {
      maxSizeMB: 3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const { data: { user } } = await supabase.auth.getUser();

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, compressedFile, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      alert("Image uploaded and ready!");
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error: " + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!window.confirm("Save changes?")) return;

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name || formData.name,
        phone: formData.phone,
        address: formData.address,
        image_url: formData.image_url,
      })
      .eq("id", user.id);

    if (!error) {
      alert("Profile updated successfully!");
      router.push("/profile");
    } else {
      alert(error.message);
    }
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
              <p className="mt-1 text-white/80">Update your cafe account information.</p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white/40 bg-[#C08A5D] shadow-lg">
                <img
                  src={formData.image_url || "/default-avatar.png"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <label className="mt-3 inline-block cursor-pointer rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-[#6B4226] transition hover:bg-[#EFEAE6]">
                {uploading ? "Uploading..." : "Change"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="Full Name"
              name="full_name"
              value={formData.full_name || formData.name || ""}
              onChange={handleChange}
            />
            <InputField label="Role" value={formData.role} disabled />
            <InputField label="Email" value={formData.email} disabled />
            <InputField label="Phone" name="phone" value={formData.phone || ""} onChange={handleChange} />
            <InputField label="Employee ID" value={formData.employee_id || formData.employeeId} disabled />
            <InputField label="Shift" value={formData.shift} disabled />
            <InputField label="Status" value={formData.status} disabled />

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#6B6B6B]">Address</label>
              <textarea
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-xl border border-[#E5E1DC] bg-[#F6F4F2] px-4 py-2.5 text-[#2D2A26] outline-none transition focus:border-[#C08A5D] focus:ring-2 focus:ring-[#C08A5D]/30"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={uploading}
              className="rounded-xl bg-[#C08A5D] px-6 py-2.5 font-semibold text-white transition hover:bg-[#A8744B] disabled:opacity-50"
            >
              Save Changes
            </button>
            <Link href="/profile" className="rounded-xl border border-[#E5E1DC] px-6 py-2.5 font-semibold text-[#2D2A26] transition hover:bg-[#EFEAE6]">
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
      <label className="mb-2 block text-sm font-medium text-[#6B6B6B]">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
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
export default function EditProfile() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        Edit Profile Page Works 🎉
      </h1>
    </div>
  );
}