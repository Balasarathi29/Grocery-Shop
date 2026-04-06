function OfferControlCard({
  featuredProducts,
  onEditProduct,
  onToggleFeatured,
  onAdjustPriority,
}) {
  const topPriority = featuredProducts[0]?.offerPriority || 0;

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
      <div className="grid gap-5 xl:grid-cols-[22rem_minmax(0,1fr)] xl:gap-6">
        <aside className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-emerald-50 p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            Promotion Zone
          </p>
          <h2 className="mt-2 font-display text-2xl text-slate-900">
            Offers Control
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Manage which products appear first in offers and tune priority in
            one place.
          </p>

          <div className="mt-4 grid gap-3 rounded-2xl border border-white/70 bg-white/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700">
                Featured Items
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {featuredProducts.length}
              </p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700">
                Top Priority
              </p>
              <p className="text-2xl font-bold text-slate-900">{topPriority}</p>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Tip: use Promote and Lower to order top deals before customers see
            the offers page.
          </p>
        </aside>

        <div>
          <div className="grid gap-3 lg:grid-cols-2">
            {featuredProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500 lg:col-span-2">
                No featured offers yet. Mark a product as featured to show it
                here.
              </div>
            ) : (
              featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-orange-100 bg-orange-50/70 px-4 py-4"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-600">
                          Priority {product.offerPriority || 0} · {product.unit}
                        </p>
                      </div>
                      <p className="text-xs font-semibold text-emerald-700">
                        Rs. {product.price} from Rs. {product.mrp}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onEditProduct?.(product)}
                        className="rounded-xl border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-brand-700 transition hover:bg-brand-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onAdjustPriority?.(product, 1)}
                        className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                      >
                        Promote
                      </button>
                      <button
                        type="button"
                        onClick={() => onAdjustPriority?.(product, -1)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Lower
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleFeatured?.(product)}
                        className="rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 transition hover:bg-orange-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferControlCard;
