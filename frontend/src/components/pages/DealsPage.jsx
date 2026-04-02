import PageShell from "./PageShell";

function DealsPage({ products, onExploreProducts }) {
  const cards = products.slice(0, 6).map((product) => ({
    kicker: product.badge,
    title: product.name,
    description: `Save Rs. ${product.mrp - product.price} on ${product.unit}. Limited time deal with fast delivery.`,
  }));

  return (
    <PageShell
      eyebrow="Offers"
      title="Today’s Best Deals"
      subtitle="Grab high-value products with instant savings and curated weekly discounts across top essentials."
      gradient="from-amber-100 via-white to-orange-100"
      cards={cards}
      primaryAction={{ label: "Shop Deals", onClick: onExploreProducts }}
      secondaryAction={{
        label: "Open Cart",
        onClick: () => onExploreProducts("cart"),
      }}
    />
  );
}

export default DealsPage;
