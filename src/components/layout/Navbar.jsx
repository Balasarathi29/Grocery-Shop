import Container from "./Container";

function Navbar({
  activePage,
  cartCount,
  onHomeClick,
  onCartClick,
  onMenuClick,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/70 bg-stone-50/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <button
          onClick={onHomeClick}
          className="flex items-center gap-3 text-left"
          aria-label="Go to home page"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-soft">
            FS
          </span>
          <div>
            <p className="font-display text-lg leading-none text-brand-900">
              FreshShelf
            </p>
            <p className="text-xs text-slate-500">Neighborhood Grocery</p>
          </div>
        </button>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
          <button
            onClick={onHomeClick}
            className={`transition hover:text-brand-700 ${
              activePage === "home" ? "text-brand-700" : ""
            }`}
          >
            Home
          </button>
          <a href="#" className="transition hover:text-brand-700">
            Categories
          </a>
          <a href="#" className="transition hover:text-brand-700">
            Deals
          </a>
          <a href="#" className="transition hover:text-brand-700">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-xl bg-brand-100 px-3 py-2 text-lg transition hover:bg-brand-200 md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>
          <button
            onClick={onCartClick}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${
              activePage === "cart"
                ? "bg-brand-900"
                : "bg-brand-700 hover:bg-brand-800"
            }`}
            aria-label="Open cart page"
          >
            Cart ({cartCount})
          </button>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;
