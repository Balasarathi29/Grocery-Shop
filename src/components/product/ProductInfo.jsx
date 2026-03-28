function ProductInfo({ product, quantity, onQuantityChange, onAddToCart }) {
  return (
    <div className="space-y-6 rounded-3xl border border-brand-100 bg-white p-6 shadow-soft sm:p-8">
      <div>
        <h3 className="font-display text-2xl font-bold text-slate-900">
          About Product
        </h3>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {product.description}
        </p>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            Stock Status
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Quantity:
        </label>
        <div className="inline-flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50 p-2">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="h-10 w-10 rounded-lg bg-white text-lg font-bold text-slate-700 transition hover:bg-brand-100"
          >
            -
          </button>
          <span className="w-12 text-center text-base font-bold text-slate-800">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="h-10 w-10 rounded-lg bg-white text-lg font-bold text-slate-700 transition hover:bg-brand-100"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => onAddToCart(product, quantity)}
          className="flex-1 rounded-xl bg-brand-700 py-3 text-center text-lg font-semibold text-white transition hover:bg-brand-800"
        >
          Add to Cart ({quantity})
        </button>
        <button className="rounded-xl border-2 border-brand-700 px-6 py-3 text-center font-semibold text-brand-700 transition hover:bg-brand-50">
          ❤
        </button>
      </div>

      <p className="text-center text-xs text-slate-500">
        Free delivery on orders above Rs. 499
      </p>
    </div>
  );
}

export default ProductInfo;
