"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function Login(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error);
  }

  redirect("/menu");
}
