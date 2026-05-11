import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Home/Navbar";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Cafe-App",
  description: "Produced by UIT team",
};

export default async function RootLayout({ children }) {
  let user = null;
  let profile = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;

    if (user) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("image_url, full_name, role")
        .eq("id", user.id)
        .maybeSingle();
      profile = profileData;
    }
  } catch (e) {
    console.error("Auth error in layout:", e);
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar serverUser="{user}" serverProfile="{profile}" />
        <main className="flex-grow pt-20">{children}</main>
      </body>
    </html>
  );
}
