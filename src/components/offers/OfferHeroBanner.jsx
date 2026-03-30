function OfferHeroBanner({ onShopEssentials, dealCount }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-[linear-gradient(120deg,#fff7ed_0%,#ffedd5_35%,#fde68a_100%)] p-6 shadow-soft sm:p-10">
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/50 blur-2xl" />
      <div className="absolute -bottom-10 -left-6 h-36 w-36 rounded-full bg-orange-300/30 blur-2xl" />

      <p className="relative z-10 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-orange-700">
        Mega Grocery Offers
      </p>
      <h1 className="relative z-10 mt-3 font-display text-3xl text-slate-900 sm:text-5xl">
        Save big on your weekly basket.
      </h1>
      <p className="relative z-10 mt-3 max-w-2xl text-sm text-slate-700 sm:text-base">
        Limited-time discounts designed to increase your value per order. Tap
        any offer card to open full product details instantly.
      </p>

      <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={onShopEssentials}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to Essentials
        </button>
        <span className="rounded-xl border border-orange-300 bg-white/70 px-4 py-2 text-sm font-semibold text-orange-800">
          {dealCount} live deals
        </span>
        <span className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
          Extra 10% on orders above Rs. 999
        </span>
      </div>
    </div>
  );
}

export default OfferHeroBanner;
