function OfferDealCard({ deal, onProductClick, onAddToCart }) {
  return (
    <article className="group rounded-2xl border border-orange-100 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-red-700">
          {deal.discount}% Off
        </p>
        <p className="text-xs font-semibold text-emerald-700">
          Save Rs. {deal.savings}
        </p>
      </div>

      <button
        onClick={() => onProductClick(deal.product)}
        className={`mb-4 flex h-24 w-full items-center justify-center rounded-2xl bg-gradient-to-br ${deal.product.palette}`}
      >
        <span className="text-4xl font-display font-semibold text-slate-700">
          {deal.product.name[0]}
        </span>
      </button>

      <button
        onClick={() => onProductClick(deal.product)}
        className="line-clamp-2 text-left text-lg font-bold text-slate-900 transition hover:text-orange-700"
      >
        {deal.product.name}
      </button>
      <p className="mt-1 text-sm text-slate-500">{deal.product.unit}</p>

      <div className="mt-4 rounded-xl bg-orange-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-700">
          Deal Price
        </p>
        <div className="mt-1 flex items-end justify-between">
          <p className="text-xl font-extrabold text-slate-900">
            Rs. {deal.product.price}
          </p>
          <p className="text-xs text-slate-500 line-through">
            Rs. {deal.product.mrp}
          </p>
        </div>
      </div>

      <button
        onClick={() => onAddToCart(deal.product)}
        className="mt-4 w-full rounded-xl bg-orange-600 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
      >
        Grab Deal
      </button>
    </article>
  );
}

export default OfferDealCard;
