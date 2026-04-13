import Container from "../layout/Container";

function AuthPanel({
  eyebrow,
  title,
  subtitle,
  form,
  footerLabel,
  footerActionLabel,
  onFooterAction,
}) {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-stone-50 via-white to-emerald-50 p-6 shadow-soft sm:p-10">
          <div className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-8 h-52 w-52 rounded-full bg-cyan-200/40 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="max-w-xl">
              <p className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-display text-3xl text-slate-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-md text-sm text-slate-600 sm:text-base">
                {subtitle}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/70 bg-white/80 p-3 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
                    Fast
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Saved details for quicker checkout.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/80 p-3 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
                    Simple
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    One account for cart, orders, and wishlist.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/80 p-3 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
                    Secure
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Protected access for your profile and orders.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-5 sm:p-6 lg:ml-auto lg:w-full lg:max-w-lg">
              {form}
            </div>
          </div>

          <div className="relative mt-6 text-center text-sm text-slate-600">
            {footerLabel}{" "}
            <button
              type="button"
              onClick={onFooterAction}
              className="font-semibold text-brand-700 transition hover:text-brand-800"
            >
              {footerActionLabel}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AuthPanel;
