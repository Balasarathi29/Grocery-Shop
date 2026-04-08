function ProductLibrary({
  products,
  onEdit,
  onDelete,
  onToggleFeatured,
  onToggleDeal,
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
        Catalog Manager
      </p>
      <h2 className="mt-2 font-display text-2xl text-slate-900">
        Product Library
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Manage products with separate controls for Spotlight and Deals For You.
      </p>

      <div className="mt-5 grid gap-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {product.name}
                  </h3>
                  {product.featuredOffer && (
                    <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-orange-700">
                      Spotlight
                    </span>
                  )}
                  {product.featuredDeal && (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-amber-700">
                      Deals For You
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {product.unit} · Rs. {product.price} / MRP Rs. {product.mrp}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Priority: {product.offerPriority || 0} · Stock:{" "}
                  {product.inStock ? "Available" : "Out of stock"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onToggleFeatured(product)}
                  className="rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 transition hover:bg-orange-100"
                >
                  {product.featuredOffer
                    ? "Remove from Spotlight"
                    : "Add to Spotlight"}
                </button>
                <button
                  onClick={() => onToggleDeal(product)}
                  className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                >
                  {product.featuredDeal ? "Remove from Deals" : "Add to Deals"}
                </button>
                <button
                  onClick={() => onEdit(product)}
                  className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 transition hover:bg-brand-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-slate-600">
              {product.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ProductLibrary;
