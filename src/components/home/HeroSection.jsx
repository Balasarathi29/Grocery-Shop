import Container from "../layout/Container";

function HeroSection({ onShopEssentials, onViewOffers }) {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_#c6f6d5,_transparent_58%),radial-gradient(circle_at_left,_#fed7aa,_transparent_45%)]" />
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="animate-riseIn">
            <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
              Fast delivery in your area
            </p>
            <h1 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Grocery shopping made fresh, fast, and local.
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg">
              Stock your kitchen in minutes with clean produce, daily
              essentials, and neighborhood prices.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onShopEssentials}
                className="rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                Shop Essentials
              </button>
              <button
                onClick={onViewOffers}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                View Offers
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="animate-floaty rounded-2xl bg-white p-5 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-700">
                Orders delivered
              </p>
              <p className="mt-2 font-display text-4xl text-slate-900">12k+</p>
              <p className="mt-1 text-sm text-slate-500">
                Trusted by nearby families
              </p>
            </div>
            <div className="rounded-2xl bg-brand-700 p-5 text-white shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-100">
                This week deal
              </p>
              <p className="mt-2 font-display text-3xl">Flat 20% Off</p>
              <p className="mt-1 text-sm text-brand-100">
                On dairy and breakfast combos
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft sm:col-span-2">
              <p className="text-sm text-slate-500">Average delivery time</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="font-display text-5xl text-slate-900">18</p>
                <p className="pb-2 text-sm font-semibold text-brand-700">
                  minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
