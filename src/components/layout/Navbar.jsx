import Container from "./Container";
import { desktopNavItems, PAGE_KEYS } from "../../constants/navigation";

function Navbar({
  activePage,
  cartCount,
  isAuthenticated,
  userName,
  onNavigate,
  onLogout,
  onMenuClick,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/70 bg-stone-50/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <button
          onClick={() => onNavigate(PAGE_KEYS.HOME)}
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
          {desktopNavItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`transition hover:text-brand-700 ${
                activePage === item.page ? "text-brand-700" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => onNavigate(PAGE_KEYS.LOGIN)}
                className="hidden rounded-xl border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 sm:block"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate(PAGE_KEYS.REGISTER)}
                className="hidden rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800 sm:block"
              >
                Register
              </button>
            </>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-xs font-semibold text-slate-600">
                Hi, {userName?.split(" ")[0] || "Member"}
              </span>
              <button
                onClick={onLogout}
                className="rounded-xl border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={onMenuClick}
            className="rounded-xl bg-brand-100 px-3 py-2 text-lg transition hover:bg-brand-200 md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>
          <button
            onClick={() => onNavigate(PAGE_KEYS.CART)}
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
