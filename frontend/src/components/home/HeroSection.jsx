import Container from "../layout/Container";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/navigation";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-12 lg:pt-16">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_100%_0%,_#bbf7d0,_transparent_45%),radial-gradient(circle_at_0%_70%,_#fde68a,_transparent_40%),linear-gradient(180deg,_#f7fff9_0%,_#ffffff_100%)]" />
      <div className="pointer-events-none absolute -left-16 top-10 -z-10 h-44 w-44 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-4 -z-10 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />
      <Container>
        <div className="grid items-center gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="animate-riseIn">
            <p className="mb-3 inline-flex rounded-full border border-brand-200 bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 backdrop-blur">
              18 min average delivery
            </p>
            <h1 className="font-display text-3xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Tap. Add. Checkout. Fresh groceries at your door.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-600 sm:mt-5 sm:text-lg">
              Fast shopping for busy days, with daily deals and reliable local
              quality.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
              <button
                onClick={() => navigate(APP_ROUTES.ESSENTIALS)}
                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate(APP_ROUTES.OFFERS)}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                Deals Today
              </button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:hidden">
              {["Fresh picks", "Instant checkout", "Daily offers"].map(
                (item) => (
                  <span
                    key={item}
                    className="whitespace-nowrap rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="hidden gap-4 lg:grid lg:grid-cols-2">
            <div className="animate-floaty rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-700">
                Customers served
              </p>
              <p className="mt-2 font-display text-4xl text-slate-900">12k+</p>
              <p className="mt-1 text-sm text-slate-500">
                Repeat orders every week
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-200">
                Hot deal
              </p>
              <p className="mt-2 font-display text-3xl">Up to 30% Off</p>
              <p className="mt-1 text-sm text-slate-200">
                Weekend fruits and breakfast kits
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft lg:col-span-2">
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
