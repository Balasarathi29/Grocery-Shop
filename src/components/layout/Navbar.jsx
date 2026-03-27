import Container from "./Container";

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/70 bg-stone-50/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-soft">
            FS
          </span>
          <div>
            <p className="font-display text-lg leading-none text-brand-900">
              FreshShelf
            </p>
            <p className="text-xs text-slate-500">Neighborhood Grocery</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
          <a href="#" className="transition hover:text-brand-700">
            Home
          </a>
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

        <button className="rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800">
          Cart (2)
        </button>
      </Container>
    </header>
  );
}

export default Navbar;
