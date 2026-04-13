import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthPanel from "../auth/AuthPanel";
import AuthField from "../auth/AuthField";
import GoogleAuthButton from "../auth/GoogleAuthButton";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, actions } = useStorefront();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const redirectPath = location.state?.from || APP_ROUTES.HOME;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await actions.onLogin(form);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    setForm({ email: "", password: "" });
    navigate(result.user?.role === "admin" ? APP_ROUTES.ADMIN : redirectPath, {
      replace: true,
    });
  };

  const handleGoogleCredential = async (credential) => {
    const result = await actions.onGoogleLogin(credential);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    navigate(result.user?.role === "admin" ? APP_ROUTES.ADMIN : redirectPath, {
      replace: true,
    });
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Login</h2>
        <p className="mt-1 text-sm text-slate-600">
          Access your account to pick up where you left off.
        </p>
      </div>

      {auth.notice && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {auth.notice}
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="grid gap-4">
        <AuthField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          autoComplete="current-password"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2"
      >
        Login to Continue
      </button>

      <GoogleAuthButton
        onCredential={handleGoogleCredential}
        onError={(message) => setError(message || "Google sign-in failed.")}
      />
    </form>
  );

  return (
    <AuthPanel
      eyebrow="Welcome Back"
      title="Sign in to Jothi"
      subtitle="Login customers can add products to cart, checkout faster, and track orders in one place."
      form={formContent}
      footerLabel="New to Jothi?"
      footerActionLabel="Create account"
      onFooterAction={() => navigate(APP_ROUTES.REGISTER)}
    />
  );
}

export default LoginPage;
