import PageShell from "./PageShell";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";

function CategoriesPage() {
  const navigate = useNavigate();
  const { catalog, actions } = useStorefront();

  const exploreProducts = (categoryId = "all") => {
    if (categoryId === "all") {
      actions.onClearCategory();
      navigate(APP_ROUTES.HOME);
      return;
    }

    actions.onCategorySelect(categoryId);
    navigate(`${APP_ROUTES.HOME}?category=${categoryId}`);
  };

  const cards = catalog.categories.map((category) => ({
    id: category.id,
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
      primaryAction={{
        label: "Explore Products",
        onClick: () => exploreProducts("all"),
      }}
      onCardClick={(card) => exploreProducts(card.id)}
    />
  );
}

export default CategoriesPage;
