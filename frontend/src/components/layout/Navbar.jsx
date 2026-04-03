import Container from "./Container";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES, desktopNavItems } from "../../constants/navigation";

function Navbar({
  cartCount,
  isAuthenticated,
  isAdmin,
  userName,
  onLogout,
  onMenuClick,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCartActive = location.pathname === APP_ROUTES.CART;

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/70 bg-stone-50/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <button
          onClick={() => navigate(APP_ROUTES.HOME)}
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
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition hover:text-brand-700 ${isActive ? "text-brand-700" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate(APP_ROUTES.LOGIN)}
                className="hidden rounded-xl border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 sm:block"
              >
                Login
              </button>
              <button
                onClick={() => navigate(APP_ROUTES.REGISTER)}
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
              {isAdmin && (
                <button
                  onClick={() => navigate(APP_ROUTES.ADMIN)}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  Admin Panel
                </button>
              )}
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
            onClick={() => navigate(APP_ROUTES.CART)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${
              isCartActive ? "bg-brand-900" : "bg-brand-700 hover:bg-brand-800"
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
