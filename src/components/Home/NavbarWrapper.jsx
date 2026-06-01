"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Home/Navbar";

const supabase = createClient();
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"];
const HIDDEN_ROUTES = ["/splash"];
const NO_CART_ROUTES = ["/", "/about"];

export default function NavbarWrapper() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from("profiles")
          .select("image_url, full_name, role")
          .eq("id", session.user.id)
          .maybeSingle();
        setProfile(data);
      }
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const { data } = await supabase
            .from("profiles")
            .select("image_url, full_name, role")
            .eq("id", session.user.id)
            .maybeSingle();
          setProfile(data);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  if (HIDDEN_ROUTES.includes(pathname)) return null;

  return (
    <Navbar
      initialUser={user}
      initialProfile={profile}
      hideAuth={AUTH_ROUTES.includes(pathname)}
      hideCart={NO_CART_ROUTES.includes(pathname)}
    />
  );
}