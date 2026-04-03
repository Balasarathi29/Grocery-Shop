function OfferControlCard({ featuredProducts }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
        Promotion Zone
      </p>
      <h2 className="mt-2 font-display text-2xl text-slate-900">
        Offers Control
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Products marked as featured appear first on the Offers page.
      </p>

      <div className="mt-5 grid gap-3">
        {featuredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
            No featured offers yet. Mark a product as featured to show it here.
          </div>
        ) : (
          featuredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-orange-100 bg-orange-50/70 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-600">
                    Priority {product.offerPriority || 0} · {product.unit}
                  </p>
                </div>
                <p className="text-xs font-semibold text-emerald-700">
                  Rs. {product.price} from Rs. {product.mrp}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OfferControlCard;
