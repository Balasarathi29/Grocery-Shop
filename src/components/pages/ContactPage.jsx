import { useState } from "react";
import Container from "../layout/Container";

function ContactPage() {
  const quickContacts = [
    {
      label: "Call Support",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
      note: "Daily, 6:00 AM to 10:00 PM",
    },
    {
      label: "Email Team",
      value: "support@freshshelf.in",
      href: "mailto:support@freshshelf.in",
      note: "Replies usually within 20 minutes",
    },
    {
      label: "Visit Store",
      value: "FreshShelf Hub, Chennai",
      href: "#",
      note: "In-store desk open till 9:30 PM",
    },
  ];

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    topic: "Order help",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      topic: "Order help",
      message: "",
    });
  };

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-6 shadow-soft sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-cyan-200/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-8 h-40 w-40 rounded-full bg-emerald-200/50 blur-2xl" />

          <div className="relative grid gap-6 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2">
              <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-100/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-900">
                Reach Us Directly
              </p>
              <h1 className="mt-3 font-display text-3xl text-slate-900 sm:text-4xl">
                We are one message away
              </h1>
              <p className="mt-3 max-w-md text-sm text-slate-600 sm:text-base">
                Share your order issue, payment question, or feedback. Our team
                picks up every request and sends a real response quickly.
              </p>

              <div className="mt-5 space-y-3">
                {quickContacts.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block rounded-2xl border border-brand-100 bg-white/85 p-4 transition hover:-translate-y-0.5 hover:border-brand-300"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                      {item.label}
                    </p>
                    <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{item.note}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-3xl border border-white/80 p-5 sm:p-6"
              >
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Send your message
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Fill this form and we will contact you directly.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Full Name
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Email
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Phone Number
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Topic
                    <select
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                    >
                      <option>Order help</option>
                      <option>Delivery issue</option>
                      <option>Payment support</option>
                      <option>Feedback</option>
                      <option>Business enquiry</option>
                    </select>
                  </label>

                  <label className="sm:col-span-2 text-sm font-medium text-slate-700">
                    Message
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help"
                      className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                    />
                  </label>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    Your details are used only for support follow-up.
                  </p>
                  <button
                    type="submit"
                    className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
                  >
                    Submit Request
                  </button>
                </div>

                {isSubmitted && (
                  <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
                    Thanks. We received your message and will reach out shortly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactPage;
