import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Signup(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
      },
    },
  });

  if (error) {
    console.error("Signup error:", error.message);
  }
  redirect("/login?message=Check your email to confirm your account");
}
