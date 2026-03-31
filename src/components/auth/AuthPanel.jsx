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
        <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-6 shadow-soft sm:p-10">
          <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-cyan-200/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-10 h-44 w-44 rounded-full bg-emerald-200/50 blur-2xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-display text-3xl text-slate-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-md text-sm text-slate-600 sm:text-base">
                {subtitle}
              </p>

              <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:max-w-sm">
                <p className="rounded-xl border border-emerald-100 bg-white/80 px-3 py-2">
                  Fast checkout and saved addresses
                </p>
                <p className="rounded-xl border border-cyan-100 bg-white/80 px-3 py-2">
                  Track all orders from one account
                </p>
                <p className="rounded-xl border border-brand-100 bg-white/80 px-3 py-2">
                  Better deals curated for members
                </p>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-5 sm:p-6">{form}</div>
          </div>

          <div className="relative mt-6 text-center text-sm text-slate-600">
            {footerLabel}{" "}
            <button
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
