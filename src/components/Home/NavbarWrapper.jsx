"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Home/Navbar";

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"];
const HIDDEN_ROUTES = ["/splash"];
const NO_CART_ROUTES = ["/", "/about"];

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.includes(pathname)) return null;

  const hideAuth = AUTH_ROUTES.includes(pathname);
  const hideCart = NO_CART_ROUTES.includes(pathname);

  return (
    <Navbar
      initialUser={null}
      initialProfile={null}
      hideAuth={hideAuth}
      hideCart={hideCart}
    />
  );
}