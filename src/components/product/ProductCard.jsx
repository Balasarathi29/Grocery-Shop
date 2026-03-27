function ProductCard({ product }) {
  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100,
  );

  return (
    <article className="group rounded-2xl border border-brand-100 bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`mb-4 flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br ${product.palette}`}
      >
        <span className="text-4xl font-display font-semibold text-slate-700">
          {product.name[0]}
        </span>
      </div>

      <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
        {product.badge}
      </p>
      <h3 className="line-clamp-2 text-base font-bold text-slate-900">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-slate-500">{product.unit}</p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-lg font-extrabold text-slate-900">
            Rs. {product.price}
          </p>
          <p className="text-xs text-slate-400 line-through">
            Rs. {product.mrp}
          </p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
          {discount}% saved
        </span>
      </div>

      <button className="mt-4 w-full rounded-xl bg-brand-700 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800">
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;
