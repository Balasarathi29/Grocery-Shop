import PageShell from "./PageShell";

function OffersPage({ products, onProductClick, onShopEssentials }) {
  const dealCards = [...products]
    .map((product) => {
      const savings = product.mrp - product.price;
      const discount = Math.round((savings / product.mrp) * 100);

      return {
        id: product.id,
        product,
        kicker: `${discount}% OFF`,
        title: product.name,
        description: `Now Rs. ${product.price} (${product.unit}) | You save Rs. ${savings}`,
      };
    })
    .sort(
      (a, b) =>
        b.product.mrp - b.product.price - (a.product.mrp - a.product.price),
    )
    .slice(0, 6);

  return (
    <PageShell
      eyebrow="Offers"
      title="Live Deals and Limited-Time Savings"
      subtitle="Handpicked discounts across popular products. Tap any deal to open the full product details instantly."
      gradient="from-amber-100 via-white to-orange-100"
      cards={dealCards}
      primaryAction={{ label: "Shop Essentials", onClick: onShopEssentials }}
      secondaryAction={null}
      onCardClick={(card) => onProductClick(card.product)}
    />
  );
}

export default OffersPage;
