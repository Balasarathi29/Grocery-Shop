import { useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";
import { formatCurrency } from "../../utils/currency";

function WishlistPage() {
  const navigate = useNavigate();
  const { auth, wishlist, actions } = useStorefront();

  const totalWishlistValue = wishlist.items.reduce(
    (total, product) => total + product.price,
    0,
  );
  const totalSavings = wishlist.items.reduce(
    (total, product) => total + Math.max(0, product.mrp - product.price),
    0,
  );

  const handleMoveToCart = async (product) => {
    actions.onAddToCart(product);
    await actions.onRemoveFromWishlist(product.id);
  };

  if (!auth.isAuthenticated) {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-8 shadow-soft sm:p-10">
            <div className="pointer-events-none absolute -left-8 top-4 h-36 w-36 rounded-full bg-rose-200/40 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-amber-200/40 blur-2xl" />

            <p className="relative inline-flex rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-rose-600">
              Wishlist Locked
            </p>
            <h1 className="relative mt-3 font-display text-3xl text-slate-900 sm:text-4xl">
              Login to save products you love
            </h1>
            <p className="relative mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Your wishlist is linked to your account and stored securely in the
              database, so it stays available every time you sign in.
            </p>

            <div className="relative mt-6 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  navigate(APP_ROUTES.LOGIN, {
                    state: { from: APP_ROUTES.WISHLIST },
                  })
                }
                className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Login to Continue
              </button>
              <button
                onClick={() => navigate(APP_ROUTES.HOME)}
                className="rounded-xl border border-rose-200 bg-white px-5 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
              >
                Browse Products
              </button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (wishlist.isLoading) {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <div className="rounded-3xl border border-brand-100 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold text-slate-500">
              Loading your wishlist...
            </p>
          </div>
        </Container>
      </section>
    );
  }

  if (wishlist.items.length === 0) {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-pink-50 via-white to-cyan-50 p-8 shadow-soft sm:p-10">
            <div className="pointer-events-none absolute -right-8 top-0 h-36 w-36 rounded-full bg-cyan-200/50 blur-2xl" />
            <div className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-pink-200/40 blur-2xl" />

            <p className="relative inline-flex rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
              Your Wishlist
            </p>
            <h1 className="relative mt-3 font-display text-3xl text-slate-900 sm:text-4xl">
              Nothing saved yet
            </h1>
            <p className="relative mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              Tap the heart on products to build a personal list of favorites.
              We keep this list in your account, so it stays after logout too.
            </p>

            <button
              onClick={() => navigate(APP_ROUTES.HOME)}
              className="relative mt-6 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              Start Exploring
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-gradient-to-r from-rose-50 via-white to-orange-50 p-6 shadow-soft sm:p-8">
          <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-8 -bottom-14 h-52 w-52 rounded-full bg-rose-200/40 blur-3xl" />

          <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-rose-600">
            Personal Wishlist
          </p>
          <h1 className="relative mt-2 font-display text-3xl text-slate-900 sm:text-4xl">
            Curated by you, saved forever
          </h1>

          <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-rose-200 bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Saved Products
              </p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">
                {wishlist.count}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Current Value
              </p>
              <p className="mt-2 text-2xl font-extrabold text-emerald-700">
                {formatCurrency(totalWishlistValue)}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Potential Savings
              </p>
              <p className="mt-2 text-2xl font-extrabold text-amber-700">
                {formatCurrency(totalSavings)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.items.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl"
            >
              <button
                type="button"
                onClick={() => navigate(APP_ROUTES.productDetail(product.id))}
                className="h-36 w-full bg-gradient-to-br"
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-36 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`flex h-36 w-full items-center justify-center bg-gradient-to-br ${product.palette}`}
                  >
                    <span className="text-5xl font-display font-semibold text-slate-700">
                      {product.name[0]}
                    </span>
                  </div>
                )}
              </button>

              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
                  {product.badge || "Top Pick"}
                </p>
                <h3 className="mt-1 line-clamp-2 text-lg font-bold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{product.unit}</p>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-lg font-extrabold text-slate-900">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-xs text-slate-400 line-through">
                      {formatCurrency(product.mrp)}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Save{" "}
                    {formatCurrency(Math.max(0, product.mrp - product.price))}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 rounded-xl bg-brand-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
                  >
                    Move to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => actions.onRemoveFromWishlist(product.id)}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WishlistPage;
