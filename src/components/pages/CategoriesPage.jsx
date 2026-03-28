import PageShell from "./PageShell";

function CategoriesPage({ categories, onExploreProducts }) {
  const cards = categories.map((category) => ({
    kicker: "Category",
    title: category.name,
    description:
      "Fresh inventory updated daily with quality checks and quick doorstep delivery.",
  }));

  return (
    <PageShell
      eyebrow="Collections"
      title="Shop By Categories"
      subtitle="Browse carefully curated collections with fresh arrivals, weekly updates, and neighborhood pricing."
      gradient="from-emerald-100 via-white to-lime-100"
      cards={cards}
      primaryAction={{ label: "Explore Products", onClick: onExploreProducts }}
    />
  );
}

export default CategoriesPage;
