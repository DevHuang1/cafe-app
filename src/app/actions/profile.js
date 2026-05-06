"use server";

import { redirect } from "next/navigation";

export async function updateProfileAction(formData) {
  const updatedProfile = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    image: formData.get("current-image-url"),
  };

  console.log("Updated profile:", updatedProfile);

  redirect("/profile");
}