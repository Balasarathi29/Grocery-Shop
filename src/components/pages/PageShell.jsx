import Container from "../layout/Container";

function PageShell({
  eyebrow,
  title,
  subtitle,
  gradient = "from-brand-100 via-white to-stone-100",
  cards = [],
  primaryAction,
  secondaryAction,
}) {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div
          className={`overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br ${gradient} p-6 shadow-soft sm:p-10`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            {subtitle}
          </p>

          {(primaryAction || secondaryAction) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {primaryAction && (
                <button
                  onClick={primaryAction.onClick}
                  className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
                >
                  {primaryAction.label}
                </button>
              )}
              {secondaryAction && (
                <button
                  onClick={secondaryAction.onClick}
                  className="rounded-xl border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
                {card.kicker}
              </p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PageShell;
