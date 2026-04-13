import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPanel from "../auth/AuthPanel";
import AuthField from "../auth/AuthField";
import GoogleAuthButton from "../auth/GoogleAuthButton";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";

function RegisterPage() {
  const navigate = useNavigate();
  const { actions } = useStorefront();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await actions.onRegister(form);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    setForm({
      fullName: "",
      email: "",
      phone: "",
      password: "",
    });
    navigate(APP_ROUTES.HOME, { replace: true });
  };

  const handleGoogleCredential = async (credential) => {
    const result = await actions.onGoogleLogin(credential);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    navigate(APP_ROUTES.HOME, { replace: true });
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Register
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Create your account to save details, speed up checkout, and track
          orders.
        </p>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Your full name"
          autoComplete="name"
        />
        <AuthField
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91"
          autoComplete="tel"
        />
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
          placeholder="Create password"
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2"
      >
        Create Account
      </button>

      <GoogleAuthButton
        onCredential={handleGoogleCredential}
        onError={(message) => setError(message || "Google sign-in failed.")}
      />
    </form>
  );

  return (
    <AuthPanel
      eyebrow="Get Started"
      title="Join Jothi Today"
      subtitle="Register once and enjoy faster checkout, personalized offers, and smooth re-ordering."
      form={formContent}
      footerLabel="Already have an account?"
      footerActionLabel="Login now"
      onFooterAction={() => navigate(APP_ROUTES.LOGIN)}
    />
  );
}

export default RegisterPage;
