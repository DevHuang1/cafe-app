import { createBrowserClient } from "@supabase/ssr";

console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("KEY starts with:", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.slice(0, 20));

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );