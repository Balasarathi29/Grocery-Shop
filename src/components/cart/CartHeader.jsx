function CartHeader({ onContinueShopping }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
          Smart Cart
        </p>
        <h1 className="mt-2 font-display text-3xl text-slate-900 sm:text-4xl">
          Your Cart
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Review items, update quantity, and place your order in seconds.
        </p>
      </div>

      <button
        onClick={onContinueShopping}
        className="rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 transition hover:border-brand-300 hover:bg-brand-50"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default CartHeader;
