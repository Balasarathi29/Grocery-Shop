import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";

function CategorySection({ categories, selectedCategoryId, onCategorySelect }) {
  return (
    <section className="py-8 sm:py-10">
      <Container>
        <div className="hidden sm:block">
          <SectionTitle
            eyebrow="Browse"
            title="Shop by Category"
            subtitle="Everything you need for home, handpicked from local vendors and farms."
          />
        </div>

        <div className="mb-3 sm:hidden">
          <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-brand-700">
            Quick Categories
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2 sm:hidden">
          <button
            onClick={() => onCategorySelect("all")}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${
              selectedCategoryId === "all"
                ? "border-brand-300 bg-brand-700 text-white"
                : "border-brand-200 bg-white text-brand-700"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={`mobile-${category.id}`}
              onClick={() => onCategorySelect(category.id)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${
                selectedCategoryId === category.id
                  ? "border-brand-300 bg-brand-700 text-white"
                  : "border-brand-200 bg-white text-brand-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`group rounded-2xl border px-5 py-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-brand-300 ${
                selectedCategoryId === category.id
                  ? "border-brand-300 bg-brand-50"
                  : "border-brand-100 bg-white"
              }`}
            >
              <p className="text-sm font-semibold text-slate-700">
                {category.name}
              </p>
              <p className="mt-1 text-xs text-slate-500 group-hover:text-brand-700">
                Explore products
              </p>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CategorySection;
