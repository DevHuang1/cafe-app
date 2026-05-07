import { useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 bg-btn-gradient text-text-light font-semibold rounded-xl shadow-soft hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Signing In..." : "Sign In"}
    </button>
  );
}
