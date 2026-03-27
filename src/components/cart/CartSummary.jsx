import { formatCurrency } from "../../utils/currency";

function CartSummary({ subtotal, savings, deliveryFee, total }) {
  return (
    <aside className="h-fit rounded-3xl border border-brand-100 bg-white p-5 shadow-soft sm:p-6 lg:sticky lg:top-24">
      <h2 className="font-display text-2xl text-slate-900">Order Summary</h2>
      <p className="mt-1 text-sm text-slate-500">
        Shipping and discounts are calculated instantly.
      </p>

      <div className="mt-6 space-y-3 border-b border-dashed border-brand-100 pb-5 text-sm">
        <div className="flex items-center justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between text-emerald-700">
          <span>Savings</span>
          <span className="font-semibold">- {formatCurrency(savings)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>Delivery</span>
          <span className="font-semibold text-slate-900">
            {deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-base font-semibold text-slate-700">Total</span>
        <span className="text-2xl font-extrabold text-brand-900">
          {formatCurrency(total)}
        </span>
      </div>

      <button className="mt-6 w-full rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
        Proceed to Checkout
      </button>

      <p className="mt-3 text-center text-xs text-slate-500">
        Free delivery for orders above Rs. 499
      </p>
    </aside>
  );
}

export default CartSummary;
