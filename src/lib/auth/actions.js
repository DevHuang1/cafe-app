"use server";

export default async function requestPasswordReset(formData) {
  const supabase = await createClient();
  const email = formData.get("email");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
  });

  if (error) {
    console.error("Reset error:", error.message);
    return { error: error.message };
  }

  redirect("/login?message=Check your email for the reset link");
}
