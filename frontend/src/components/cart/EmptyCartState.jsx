import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/navigation";

function EmptyCartState() {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft">
      <div className="bg-gradient-to-r from-brand-100 via-brand-50 to-stone-100 p-10 text-center sm:p-14">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-sm font-bold text-brand-800 shadow-soft">
          CART
        </span>
        <h2 className="mt-5 font-display text-3xl text-slate-900">
          Your cart is waiting
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-600 sm:text-base">
          Add fresh groceries to see them here. Pick your favorites and we will
          keep them ready for checkout.
        </p>
        <button
          onClick={() => navigate(APP_ROUTES.HOME)}
          className="mt-7 rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          Browse Products
        </button>
      </div>
    </div>
  );
}

export default EmptyCartState;
