function ProductImageCard({ product }) {
  return (
    <div className="flex h-full min-h-96 flex-col items-center justify-center rounded-3xl border border-brand-100 bg-white p-8 shadow-soft">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mb-6 h-64 w-64 rounded-3xl object-cover transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div
          className={`relative mb-6 flex h-64 w-64 items-center justify-center rounded-3xl bg-gradient-to-br ${product.palette} transition-transform duration-300 hover:scale-105`}
        >
          <span className="font-display text-8xl font-bold text-slate-600">
            {product.name[0]}
          </span>
        </div>
      )}

      <div className="absolute left-4 top-4">
        <span className="inline-block rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700">
          {product.badge}
        </span>
      </div>

      <div className="mt-8 text-center">
        <h2 className="font-display text-3xl font-bold text-slate-900">
          {product.name}
        </h2>
        <p className="mt-2 text-lg text-slate-600">{product.unit}</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <div>
            <p className="text-sm text-slate-500">MRP</p>
            <p className="text-lg line-through text-slate-400">
              Rs. {product.mrp}
            </p>
          </div>
          <div className="rounded-lg bg-brand-100 px-4 py-2">
            <p className="font-display text-3xl font-bold text-brand-900">
              Rs. {product.price}
            </p>
            <p className="text-xs font-bold text-brand-700">
              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
              OFF
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductImageCard;
