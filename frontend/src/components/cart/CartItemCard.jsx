import { formatCurrency } from "../../utils/currency";

function CartItemCard({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}) {
  return (
    <article className="rounded-3xl border border-brand-100 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br ${item.palette}`}
          >
            <span className="font-display text-3xl text-slate-700">
              {item.name[0]}
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              {item.name}
            </h3>
            <p className="mt-0.5 text-sm text-slate-500">{item.unit}</p>
            <p className="mt-2 text-sm text-slate-400 line-through">
              {formatCurrency(item.mrp)}
            </p>
            <p className="text-lg font-extrabold text-slate-900">
              {formatCurrency(item.price)}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between sm:flex-col sm:items-end sm:justify-center">
          <div className="inline-flex items-center gap-1 rounded-xl border border-brand-100 bg-brand-50 p-1">
            <button
              onClick={() => onDecreaseQuantity(item.id)}
              className="h-9 w-9 rounded-lg bg-white text-lg font-bold text-slate-700 transition hover:bg-brand-100"
              aria-label={`Decrease quantity of ${item.name}`}
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-bold text-slate-800">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncreaseQuantity(item.id)}
              className="h-9 w-9 rounded-lg bg-white text-lg font-bold text-slate-700 transition hover:bg-brand-100"
              aria-label={`Increase quantity of ${item.name}`}
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-lg font-extrabold text-brand-900">
              {formatCurrency(item.price * item.quantity)}
            </p>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="mt-1 text-xs font-semibold text-rose-600 transition hover:text-rose-700"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItemCard;
