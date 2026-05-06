import React from "react";
import Link from "next/link";
import Signup from "@/lib/signup/actions";

export default function SignUpPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUserEmail(formData.get("email"));

    await Signup(formData);
    setIsModalOpen(true);
  };
  const handleVerifyOtp = async (otp) => {
    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.verifyOtp({
        email: userEmail,
        token: otp,
        type: "signup",
      });

      if (error) {
        alert("Invalid code. Please try again.");
        return;
      }

      if (data.session) {
        window.location.href = "/menu";
      }
    } catch (err) {}
  };
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-bg-card rounded-2xl shadow-card p-8 border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Create Account
          </h1>
          <p className="text-text-secondary">Join our café community today</p>
        </div>

        {/* Form using Server Action */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                required
                className="w-full px-4 py-2.5 bg-bg-muted border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                placeholder="Aung"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                required
                className="w-full px-4 py-2.5 bg-bg-muted border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                placeholder="Kyaw"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 bg-bg-muted border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
              placeholder="coffee-lover@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full px-4 py-2.5 bg-bg-muted border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
              placeholder="At least 6 characters"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-accent text-text-light font-semibold rounded-xl shadow-soft hover:bg-accent-hover transition-colors active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-text-secondary text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline"
          >
            Log in here
          </Link>
        </p>
      </div>
      <OtpModal
        isOpen={isModalOpen}
        email={userEmail}
        onVerify={handleVerifyOtp}
      />
    </div>
  );
}
